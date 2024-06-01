'use client';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import CodeBlock from '@/components/Sections/codeBlock';

const TrendingPage = () => {
  const [codeData, setCodeData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortType, setSortType] = useState('upvotes');
  const [filterType, setFilterType] = useState('allTime');

  useEffect(() => {
    const getAllCode = async () => {
      try {
        const response = await axios.get(`/api/get-all-code`);
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
  }, []);

  useEffect(() => {
    let data = [...codeData];

    // Filter data based on filterType
    if (filterType === 'topOfMonth') {
      data = data.filter(code => dayjs(code.createdAt).isAfter(dayjs().subtract(1, 'month')));
    } else if (filterType === 'topOfWeek') {
      data = data.filter(code => dayjs(code.createdAt).isAfter(dayjs().subtract(1, 'week')));
    }

    // Sort data based on sortType
    if (sortType === 'upvotes') {
      data.sort((a, b) => b.upvotes - a.upvotes);
    }

    setFilteredData(data);
  }, [codeData, sortType, filterType]);

  const handleSortChange = (sortType: string) => {
    setSortType(sortType);
  };

  const handleFilterChange = (filterType: string) => {
    setFilterType(filterType);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Trending Codes</h1>

      <div className="flex mb-4">
        <button onClick={() => handleFilterChange('allTime')} className={`mr-2 px-4 py-2 rounded ${filterType === 'allTime' ? 'bg-pink-700' : 'bg-gray-700'}`}>All Time</button>
        <button onClick={() => handleFilterChange('topOfMonth')} className={`mr-2 px-4 py-2 rounded ${filterType === 'topOfMonth' ? 'bg-pink-700' : 'bg-gray-700'}`}>Top of Month</button>
        <button onClick={() => handleFilterChange('topOfWeek')} className={`px-4 py-2 rounded ${filterType === 'topOfWeek' ? 'bg-pink-700' : 'bg-gray-700'}`}>Top of Week</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className='flex flex-col'>
          {filteredData && filteredData.map((code: any, index: any) => (
            <CodeBlock
            key={code._id}
            id={code._id}
            title={code.title}
            keywords={code.keywords}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPage;
