'use client'
import { useForm } from 'react-hook-form';
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
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';


export default function NewCode() {


    const form = useForm({
    defaultValues: {
      title: '',
      keywords: '',
      code:'',
      dependencies:'',
      note:''

    },
  });

  const onSubmit = async(data:any)  =>{
    console.log(data)
  }

  return (
    <div className='bg-black/[0.96] w-screen flex flex-col py-8 justify-center items-center min-h-screen text-white'>
        <h4 className='text-[35px] font-bold pb-4 h-5/6 underline text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700'>Add New Code</h4>
        <div className='border p-8 w-3/5  rounded-md border-zinc-700 shadow-inner shadow-zinc-600'>
         <Form {...form} >
          <form className="flex justify-around space-x-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col justify-start space-y-12  w-1/2'>
                 <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                 <Input required placeholder='for ex - how to use redux in nextJs' className='bg-transparent border-zinc-800' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="keywords"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                 <Input placeholder='for ex. react, mongodb, connection, database' required className='bg-transparent border-zinc-800' {...field} />
                                    
                  <FormMessage />
                </FormItem>
              )}
            />


                <FormField
              name="dependencies"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dependencies</FormLabel>
                  <Textarea rows={3} className='bg-transparent border-zinc-800' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="note"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <Textarea rows={5} className='bg-transparent border-zinc-800' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className='w-1/2 flex flex-col space-y-4'>

               <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                    
                  <Textarea {...field} spellCheck={false} rows={30} required className=' bg-transparent border-zinc-800' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button className='w-40 py-6 text-xl font-semibold  bg-gradient-to-r from-pink-600 via-pink-700 to-pink-900' type="submit">Add</Button>
                </div>
           
             
           
          </form>
        </Form>
       </div> 
    </div>
  )
}
