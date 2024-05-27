'use client';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

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
        <button onClick={() => handleFilterChange('allTime')} className={`mr-2 px-4 py-2 rounded ${filterType === 'allTime' ? 'bg-purple-500' : 'bg-gray-700'}`}>All Time</button>
        <button onClick={() => handleFilterChange('topOfMonth')} className={`mr-2 px-4 py-2 rounded ${filterType === 'topOfMonth' ? 'bg-purple-500' : 'bg-gray-700'}`}>Top of Month</button>
        <button onClick={() => handleFilterChange('topOfWeek')} className={`px-4 py-2 rounded ${filterType === 'topOfWeek' ? 'bg-purple-500' : 'bg-gray-700'}`}>Top of Week</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div>
          {filteredData && filteredData.map((code: any, index: any) => (
            <div key={index} className="bg-black shadow shadow-white p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold">{code.title}</h2>
              <p className="text-gray-300 mb-4">{code.description}</p>
              <div className="flex flex-wrap mb-4">
                {code.keywords.split(',').map((keyword: string, index: number) => (
                  <span key={index} className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {keyword}
                  </span>
                ))}
              </div>
              <Link href={`/code/${code._id}`} className="text-purple-500 hover:underline">View Code</Link>
              <span className="ml-4 text-gray-400">Upvotes: {code.upvotes}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingPage;
