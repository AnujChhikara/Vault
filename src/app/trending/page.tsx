'use client';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const TrendingPage = () => {
  const [codeData, setCodeData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
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
  return (
    <div className="min-h-screen bg-black text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Trending Codes</h1>
      
      <div className="min-h-screen bg-black text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Trending Codes</h1>

      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div>
          {codeData && codeData.map((code:any, index:any) => (
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
              <Link href={`/code/${code._id}`}className="text-purple-500 hover:underline">View Code</Link>
              <span className="ml-4 text-gray-400">Upvotes: {code.upvotes}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  

    </div>
  );
};

export default TrendingPage;
