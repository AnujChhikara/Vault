'use client';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import CodeBlock from '@/components/Sections/codeBlock';

const TrendingPage = () => {
  const [codeData, setCodeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('allTime');

  useEffect(() => {
    const getAllCode = async () => {
      try {
        const response = await axios.get(`/api/top-code?time=${filterType}`);
        const data = response.data.data;
        if (data) {
          setCodeData(data);
          setLoading(false);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(axiosError.response?.data.message || 'Error fetching code details');
        setLoading(false);
      }
    };

    getAllCode();
  }, [filterType]);


  const handleFilterChange = (filterType: string) => {
    setFilterType(filterType);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-12 px-4 ">
      <h1 className="text-4xl font-bold mb-8">Trending Codes</h1>

      <div className="flex mb-4 sm:text-sm md:text-base font-semibold">
        <button onClick={() => handleFilterChange('allTime')} className={`mr-2 px-4 py-2 rounded ${filterType === 'allTime' ? 'bg-pink-700' : 'bg-gray-700'}`}>All Time</button>
        <button onClick={() => handleFilterChange('month')} className={`mr-2 px-4 py-2 rounded ${filterType === 'month' ? 'bg-pink-700' : 'bg-gray-700'}`}>Top of Month</button>
        <button onClick={() => handleFilterChange('week')} className={`px-4 py-2 rounded ${filterType === 'week' ? 'bg-pink-700' : 'bg-gray-700'}`}>Top of Week</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className='flex flex-col'>
          {codeData && codeData
          .sort((a, b) => b.totalVotes - a.totalVotes)
          .map((code: any) => (
            <div key={code._id}>
              <CodeBlock
            key={code.code._id}
            id={code.code._id}
            title={code.code.title}
            keywords={code.code.keywords}
            />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPage;
