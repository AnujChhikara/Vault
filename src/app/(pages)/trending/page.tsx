"use client";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useRef } from "react";
import CodeBlock from "@/components/Sections/codeBlock";
import Link from "next/link";
import { ChevronFirst } from "lucide-react";

const TrendingPage = () => {
  const [codeData, setCodeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterType, setFilterType] = useState("allTime");
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const getAllCode = async () => {
      try {
        const response = await axios.get(`/api/top-code?time=${filterType}`);
        const data = response.data.data;
        if (data) {
          const sortedData = data.sort(
            (a: any, b: any) => b.totalVotes - a.totalVotes
          );
          setCodeData(sortedData);
          setLoading(false);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data.message || "Error fetching code details"
        );
        setLoading(false);
      }
    };

    if (!dataFetchedRef.current) {
      getAllCode();
      dataFetchedRef.current = true;
    }
  }, [filterType]);

  const handleFilterChange = (filterType: string) => {
    setFilterType(filterType);
    setLoading(true);
    dataFetchedRef.current = false;
  };

  return (
    <div className='min-h-screen  text-gray-100 pt-12 flex flex-col items-start'>
      <h1 className='text-4xl font-bold mb-8'>Trending Codes</h1>

      <div className='flex mb-4 sm:text-sm md:text-base font-semibold'>
        <button
          onClick={() => handleFilterChange("allTime")}
          className={`mr-2 px-4 py-2 rounded ${
            filterType === "allTime" ? "bg-pink-700" : "bg-gray-700"
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => handleFilterChange("month")}
          className={`mr-2 px-4 py-2 rounded ${
            filterType === "month" ? "bg-pink-700" : "bg-gray-700"
          }`}
        >
          Top of Month
        </button>
        <button
          onClick={() => handleFilterChange("week")}
          className={`px-4 py-2 rounded ${
            filterType === "week" ? "bg-pink-700" : "bg-gray-700"
          }`}
        >
          Top of Week
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className='sm:grid pt-6 sm:grid-cols-1 sm:gap-y-1  md:grid-cols-1 md:gap-y-0 md:gap-x-4 md:gap-b-4 lg:grid-cols-2 lg:gap-r-4 lg:gap-b-4'>
          {codeData && codeData.length > 0 ? (
            codeData.map((code: any) => (
              <div key={code._id}>
                <CodeBlock
                  key={code.code._id}
                  id={code.code._id}
                  title={code.code.title}
                  keywords={code.code.keywords}
                />
              </div>
            ))
          ) : (
            <div className='text-center '>No code posted yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingPage;
