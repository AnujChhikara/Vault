'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import SkeletonComponent from '@/components/Sections/skeleton';
import CodeBlock from '@/components/Sections/codeBlock';
import Link from 'next/link';
import { set } from 'mongoose';

export default function SearchResult() {
  const { query } = useParams(); 
  const [resultData, setResultData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const gettingSearchResult = async () => {
      try {
        const response = await axios.get(`/api/search?query=${query}`);
        const data = response.data.data;
        if (data) {
          setResultData(data);
          setLoading(false);
        
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(axiosError.response?.data.message || 'Error fetching user profile');
       setLoading(false);
      }
    };

    if (query) {
      gettingSearchResult();
    }
  }, [query]);

  return (
    <div className='bg-black w-full h-full min-h-screen text-white flex justify-center items-start px-12 md:py-20 sm:py-6'>
      {loading ? (
        <div className='flex flex-col items-start w-screen space-y-8'>
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          
        </div>
      ) : (
        <div className=''>
         
        {resultData && resultData.length ===0? <div className='flex flex-col justify-center items-center space-y-4'>
          <h3 className='text-xl '>Unfortunately, no results were found for your search.</h3>
          <Link href='/' className='bg-zinc-900 px-6 py-2 rounded-md duration-300 hover:bg-zinc-800'>Home</Link>
        </div> : 
        <div className='flex flex-col space-y-4 items-start justify-start w-screen sm:px-4 md:px-12'>
          <h2>Search results...</h2>
          <div className='flex flex-col space-y-4 '>
            {
               resultData.map((item) => (
          <CodeBlock key={item._id} 
          title={item.title}
          id={item._id}
          keywords={item.keywords}
          />
        ) )
            }
          </div>
        </div>
       }</div>
      )}
    </div>
  );
}
