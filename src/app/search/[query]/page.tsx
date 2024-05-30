'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import SkeletonComponent from '@/components/Sections/skeleton';

export default function SearchResult() {
  const { query } = useParams(); 
  const [resultData, setResultData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const gettingSearchResult = async () => {
      try {
        const response = await axios.get(`/api/search?query=${query}`);
        console.log(response);
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
    <div className='bg-black w-full h-screen text-white flex justify-center items-start px-20 py-20'>
      {loading ? (
        <div className='grid grid-cols-2 gap-12'>
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
        </div>
      ) : (
        <div>{query}</div>
      )}
    </div>
  );
}
