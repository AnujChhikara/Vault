'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SignInForm() {
 const[isLoggedIn, setIsLoggedIn] = useState(false)
 const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
     setIsSubmitting(true)
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (!result?.ok) {
     setIsSubmitting(false)
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
    
    }

    if(result!.ok){
      setIsSubmitting(false)
        toast({
          title: 'Login Successfully',
          description: 'you have been logged in successfully',
  
        });
    setIsSubmitting(false)
      setIsLoggedIn(true)
    }

  };

  if(isLoggedIn){
    redirect('/')
  }

  return (
    <div className="flex justify-center items-center min-h-screen sm:px-6 md:px-0 bg-black/[0.96]">
      <div className="w-full max-w-md p-6 space-y-6 bg-transparent text-white border border-zinc-700 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to DevVault
          </h1>
          <p className="mb-4">Sign in to store your resusable codes</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input className='bg-transparent border-zinc-800' {...field} />
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
                  <Input type="password" className='bg-transparent border-zinc-800' {...field} />
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
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-pink-600 hover:text-pink-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}