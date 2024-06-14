"use client";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CodeBlock({
  title,
  id,
  keywords,
}: {
  title: string;
  id: string;
  keywords: string;
}) {
  const [votes, setVotes] = useState<number>(0);

  useEffect(() => {
    const checkVotesCount = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/total-votes?codeId=${id}`);
          const data = response.data.data;
          if (data != undefined) {
            setVotes(data[0]?.totalVotes);
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          console.log(axiosError);
        }
      }
    };

    if (id) {
      checkVotesCount();
    }
  }, [id]);
  return (
    <div className=' border-2 border-gray-600  p-4 md:p-6 sm:p-4 md:w-[700px] sm:w-[330px] md:h-[160px] rounded-lg mb-6'>
      <h2 className='text-xl font-bold'>{title}</h2>

      <div className='flex flex-wrap mb-2 mt-4'>
        {keywords.split(",").map((keyword: string, index: number) => (
          <span
            key={index}
            className='bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2'
          >
            {keyword}
          </span>
        ))}
      </div>
      <Link href={`/code/${id}`} className='text-pink-500 hover:underline'>
        View Code
      </Link>
      <span className='ml-4 text-gray-400'>Upvotes: {votes}</span>
    </div>
  );
}
