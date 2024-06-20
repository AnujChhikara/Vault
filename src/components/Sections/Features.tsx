"use client";
import Link from "next/link";
import React from "react";

export default function Features() {
  return (
    <div className='flex flex-col items-center justify-center md:py-12 sm:py-4 '>
      <h2 className='text-4xl font-bold text-white mb-10'>Features</h2>
      <div className='md:flex md:flex-row sm:flex sm:flex-col justify-center gap-8'>
        <div className='sm:w-80 md:w-96 relative '>
          <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-gray-300  to-black transform scale-[0.70]  rounded-full blur-3xl' />
          <div className='relative shadow-xl bg-transparent border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start'>
            <h1 className='font-bold text-xl text-white mb-4 relative z-50'>
              Trending Code Snippets
            </h1>
            <p className='font-normal text-base text-slate-200 mb-4 relative z-50'>
              Discover the most popular code snippets among developers.
            </p>
            <Link
              href='/trending'
              className='border px-4 py-1 rounded-lg border-gray-500 text-gray-300'
            >
              Explore
            </Link>
          </div>
        </div>

        <div className='sm:w-80 md:w-96 relative '>
          <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-gray-300  to-black transform scale-[0.70]  rounded-full blur-3xl' />
          <div className='relative shadow-xl bg-transparent border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start'>
            <h1 className='font-bold text-xl text-white mb-4 relative z-50'>
              Reusable Code
            </h1>
            <p className='font-normal text-base text-slate-200 mb-4 relative z-50'>
              Save and organize your favorite code snippets for easy access.
            </p>
            <Link
              href='/new-code'
              className='border px-4 py-1 rounded-lg border-gray-500 text-gray-300'
            >
              Explore
            </Link>
          </div>
        </div>

        <div className='sm:w-80 md:w-96 relative '>
          <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-gray-300  to-black transform scale-[0.70]  rounded-full blur-3xl' />
          <div className='relative shadow-xl bg-transparent border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start'>
            <h1 className='font-bold text-xl text-white mb-4 relative z-50'>
              Leaderboard
            </h1>
            <p className='font-normal text-base text-slate-200 mb-4 relative z-50'>
              Compete with other developers and climb the ranks.
            </p>
            <Link
              href='/leaderboard'
              className='border px-4 py-1 rounded-lg border-gray-500 text-gray-300'
            >
              Explore
            </Link>
          </div>
        </div>

        <div className='sm:w-80 md:w-96 relative '>
          <div className='absolute inset-0 h-full w-full  transform scale-[0.70] bg-gradient-to-r from-gray-300  to-black rounded-full blur-3xl' />
          <div className='relative shadow-xl bg-transparent border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start'>
            <h1 className='font-bold text-xl text-white mb-4 relative z-50'>
              Bookmark Others Code
            </h1>
            <p className='font-normal text-base text-slate-200 mb-4 relative z-50'>
              Bookmark code snippets from other developers for future reference.
            </p>
            <button className='border px-4 py-1 rounded-lg border-gray-500 text-gray-300'>
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
