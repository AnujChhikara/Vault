"use client";

import SkeletonComponent from "@/components/Sections/skeleton";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function LeaderBoard() {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<any>([]);
  const [isFethed, setIsFethed] = useState(false);

  useEffect(() => {
    const fetchUserVotes = async () => {
      try {
        const response = await axios.get(`/api/leader`);
        const data = response.data.data;
        setData(data);
        setIsFethed(true);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data.message || "Error fetching Leaderboard"
        );
        setIsFethed(true);
      }
    };
    fetchUserVotes();
  }, []);

  return (
    <div className='bg-black text-white min-h-screen sm:py-4 md:py-12 flex flex-col items-center'>
      <h1 className='text-center text-3xl font-bold mb-8  text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-pink-200'>
        Leaderboard
      </h1>
      {isFethed && !errorMessage ? (
        <>
          <table className='table-auto sm:w-[330px]  md:w-[600px]'>
            <thead className=''>
              <tr className='text-center sm:text-sm md:text-xl text-zinc-300 underline underline-offset-2'>
                <th className='px-4 py-2'>Rank</th>
                <th className='px-4 py-2'>Username</th>
                <th className='px-4 py-2'>Points</th>
                <th className='px-4 py-2'>Profile</th>
              </tr>
            </thead>

            <tbody className=' border-dotted border-2  border-zinc-400'>
              {data.length > 0 &&
                data
                  .sort((a: any, b: any) => b.totalVotes - a.totalVotes)
                  .slice(0, 5)
                  .map((item: any, index: any) => (
                    <tr
                      key={item.user._id}
                      className='text-center sm:text-sm md:text-lg font-semibold'
                    >
                      <td className='px-4 py-2'>
                        {index + 1 == 1
                          ? "🥇"
                          : index + 1 == 2
                          ? "🥈"
                          : index + 1 == 3
                          ? "🥉"
                          : index + 1}
                      </td>
                      <td className='px-4 py-2'>{item.user.name}</td>
                      <td className=' px-4 py-2'>{item.totalVotes}</td>
                      <td className=' px-4 py-2'>
                        <Link
                          href={`/profile/${item.user.name}`}
                          className='text-pink-300 text-sm underline hover:underline'
                        >
                          Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div></div>
        </>
      ) : errorMessage ? (
        <p className='text-red-500'>{errorMessage}</p>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
}
