'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback} from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios,{AxiosError} from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

export default function Page() {
  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage] =useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounce = useDebounceCallback(setUsername, 300)
  const { toast } = useToast()
  const router = useRouter()

  //zod implementaion

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })

  //checking if username is unique
useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);


  const onSubmit = async(data:z.infer<typeof signUpSchema>) =>{
    setIsSubmitting(true)


    try {
     const response = await axios.post('/api/sign-up', data)
     toast({
      title:'Success',
      description:response.data.message
     })

     router.replace(`/verify/${username}`)
     setIsSubmitting(false)
    } catch (error) {
      console.log("Error in signup of user", error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
       toast({
      title:'SignUp failed!',
      description:errorMessage,
      variant:"destructive"
     })

     setIsSubmitting(false)
      
    }
  }

  return (
   <div className="flex justify-center items-center min-h-screen  bg-black/[0.96]">
      <div className="w-full max-w-md p-6 space-y-6 bg-transparent text-white border border-zinc-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
            Welcome to DevVault!
          </h1>
          <p className="mb-3 font-bold tracking-tight text-zinc-400">Start Organizing Your Code - Sign Up Now!</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input className='bg-transparent border-zinc-800'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounce(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin " />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === 'Username is available'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input className='bg-transparent border-zinc-800' {...field} name="email" />
                  <p className='text-muted text-zinc-400 text-sm'>We&apos;ll send you a verification code shortly.</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input className='bg-transparent border-zinc-800' type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/Sign-in" className="text-pink-600 hover:text-pink-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}