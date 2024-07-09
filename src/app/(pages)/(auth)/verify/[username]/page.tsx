'use client'
import { ApiResponse } from '@/types/ApiResponse'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function VerifyAccount() {
  const router = useRouter()
  const params = useParams<{username:string}>()
  const {toast} = useToast()
 
   //zod implementaion
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver:zodResolver(verifySchema)
  })

  const onSubmit = async(data:z.infer<typeof verifySchema>) => {
  try {
   const response = await axios.post(`/api/verify-code`,{
      username:params.username,
      code:data.code
    })

    toast({
      title: "Success",
      description:response.data.message
    })

    router.replace('/Sign-in')
  } catch (error) {
     const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
       toast({
      title:'Verification failed',
      description:errorMessage,
      variant:"destructive"
     })
  }
  }
  return (
     <div className="bg-black/[0.96] min-h-screen text-white">
      <div className=' flex md:items-center pt-8 sm:items-start justify-center'>

      
      <div className="sm:w-[330px] md:w-auto md:py-8 md:px-8 sm:py-8 sm:px-4 space-y-8  border text-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input className='bg-transparent border-zinc-800' {...field} name='verify-code' />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
      </div>
    </div>
  )
}
