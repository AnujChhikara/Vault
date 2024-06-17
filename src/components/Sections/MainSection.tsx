"use client";
import Image from "next/image";
import React from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { Spotlight } from "../ui/Spotlight";
import Navbar from "./Navbar";
import Search from "./Search";
export default function MainSection() {
  const words = [
    {
      text: "Focus",
    },
    {
      text: "on",
    },
    {
      text: "Logic,",
      className: "text-blue-500 ",
    },

    {
      text: "Let",
    },
    {
      text: "us",
    },

    {
      text: "Memorize",
    },
    {
      text: "Code",
    },
    {
      text: "for",
    },
    {
      text: "you.",
      className: "text-blue-500 underline",
    },
  ];

  return (
    <div className=' w-full rounded-md flex flex-col items-center justify-start relative overflow-hidden mx-auto '>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='#E178C5'
      />

      <Navbar />
      <div className='flex flex-col items-center pt-20 md:space-y-20 sm:space-y-16'>
        {/* logo */}
        <div className='flex justify-center space-x-4  items-center'>
          <Image
            width={100}
            height={100}
            className='sm:w-20 md:w-28'
            src='https://res.cloudinary.com/dlahahicg/image/upload/v1715159647/1_oj2rgu.png'
            alt='logo'
          />
          <div className='flex flex-col  items-start'>
            <h1 className='md:text-7xl sm:text-[40px] font-bold '>DevVault</h1>
            <div className='relative md:w-96 sm:w-48 '>
              {/* Gradients */}
              <div className='absolute md:inset-x-20  bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
              <div className='absolute md:inset-x-20  bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
              <div className='absolute md:inset-x-60 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
              <div className='absolute md:inset-x-60  bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
            </div>
          </div>
        </div>

        {/* heading */}

        <h3 className='w-96 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-bold text-3xl flex justify-center sm:block md:hidden'>
          Focus on Logic, Let us Memorize Code for you
        </h3>
        <TypewriterEffectSmooth words={words} />

        {/* Search */}
        <Search />
        {/* <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      /> */}
        {/* brief info */}
        <p className='mt-4  sm:px-2 sm:w-96 md:w-auto sm:text-sm md:text-lg tracking-wide  text-center font-semibold  text-neutral-300 max-w-3xl mx-auto'>
          Introducing DevVault, your ultimate destination for storing and
          discovering reusable code snippets. Whether you&lsquo;re in need of
          quick solutions or fundamental configurations, DevVault provides
          seamless access to a vast array of code essentials. Simplify your
          coding experience with our intuitive platform - where a treasure trove
          of solutions is just a click away.
        </p>
      </div>
      <div></div>
    </div>
  );
}
