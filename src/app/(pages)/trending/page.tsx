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
    <div className='min-h-screen bg-black text-gray-100 pt-4 md:px-12 sm:px-4 flex flex-col items-start'>
      <div className=' text-slate-200 font-bold   hover:slate-300 duration-500  md:text-end sm:text-start pb-8'>
        <button className='inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-zinc-500 to-zinc-800   text-white'>
          <span className=' px-3 py-1.5 transition-all ease-in duration-300 bg-zinc-900 rounded-md group-hover:bg-opacity-50'>
            <Link href='/' className='flex items-center'>
              <ChevronFirst size={20} />{" "}
              <p className='text-[12px] font-semibold'>Home</p>
            </Link>
          </span>
        </button>
      </div>
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
        <div className='flex flex-col'>
          {codeData &&
            codeData.map((code: any) => (
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
