"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ChevronFirst, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";

export default function NewCode() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      keywords: "",
      code: "",
      dependencies: "",
      note: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    data.userId = user._id;
    try {
      const response = await axios.post("/api/new-code", data);
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
      } else {
        toast({
          title: "failed",
          description: response.data.message,
          variant: "destructive",
        });
      }

      router.replace(`/`);
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error posting new code snippet", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "failed!",
        description: errorMessage,
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-black/[0.96] w-screen flex flex-col justify-center sm:px-4 md:px-8 pt-4 md:items-start min-h-screen text-white'>
      <div className=' text-slate-200 font-bold  hover:slate-300 duration-500  md:text-end sm:text-start pb-8'>
        <button className='inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-zinc-500 to-zinc-800   text-white'>
          <span className=' px-3 py-1.5 transition-all ease-in duration-300 bg-zinc-900 rounded-md group-hover:bg-opacity-50'>
            <Link href='/' className='flex items-center'>
              <ChevronFirst size={20} />{" "}
              <p className='text-[12px] font-semibold'>Home</p>
            </Link>
          </span>
        </button>
      </div>
      <h4 className='text-[35px] font-bold pb-4  md:h-5/6 underline text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700'>
        Add New Code
      </h4>
      <div className='border md:p-8 sm:p-4 md:w-3/5  md:px-0 rounded-md border-zinc-600 border-dashed'>
        <Form {...form}>
          <form
            className='sm:flex md:px-8 md:flex md:flex-row sm:flex-col md:justify-around md:space-x-8'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='flex flex-col justify-start md:space-y-12 sm:space-y-4  md:w-1/2'>
              <FormField
                name='title'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg'>Title</FormLabel>
                    <Input
                      required
                      placeholder='for ex - how to use redux in nextJs'
                      className='bg-transparent border-dashed  border-zinc-800'
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='keywords'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg'>Keywords</FormLabel>
                    <Input
                      placeholder='for ex. react, mongodb, connection, database'
                      required
                      className='bg-transparent border-dashed border-zinc-800'
                      {...field}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='dependencies'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg'>Dependencies</FormLabel>
                    <Textarea
                      placeholder='npm install @reduxjs/toolkit'
                      rows={3}
                      className='bg-transparent border-dashed border-zinc-800'
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='note'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg'>Note</FormLabel>
                    <Textarea
                      rows={5}
                      className='bg-transparent border-zinc-800 border-dashed'
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='md:w-1/2 flex flex-col space-y-4'>
              <FormField
                name='code'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg'>Code</FormLabel>

                    <Textarea
                      {...field}
                      spellCheck={false}
                      rows={30}
                      required
                      className=' bg-transparent border-zinc-600 border-dashed'
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-end'>
                <Button
                  className='w-40 py-6 text-xl font-semibold bg-gradient-to-r from-pink-600 via-pink-700 to-pink-900'
                  type='submit'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Please wait
                    </>
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
