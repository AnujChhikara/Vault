'use client'
import Image from 'next/image'
import React from 'react'
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { Spotlight } from '../ui/Spotlight';
import Navbar from './Navbar';
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
export default function MainSection() {

    const placeholders = [
    "How do I integrate Redux for state management in a MERN stack application?",
    "How to connect mognoDB in nextjs?",
    "How to handle form submittion in react?",
    "How to connect frontend with backend?",
    "How to create api routes in nextjs?",
  ];
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
     const words = [
    {
      text: "Focus",
    },
    {
      text: "on",
    },
    {
      text: "Logic",
      className: "text-blue-500 ",
    },
    
    {
      text: "Not",
    },
    {
      text: "Memorizing",
      className: "text-blue-500 underline",
    },
    {
      text: "Code.",
      
    },
  ];
   

  return (
    <div className=' w-full rounded-md flex flex-col items-center justify-start relative overflow-hidden mx-auto '>
          <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#E178C5"
      />
 

      
      <Navbar/>
      <div className='flex flex-col items-center pt-20 space-y-16'>
        {/* logo */} 
        <div className="flex justify-center items-center">
        <Image width={100} height={100} src="https://res.cloudinary.com/dlahahicg/image/upload/v1715159647/1_oj2rgu.png" alt="logo"/>
        <div className="flex flex-col  items-start">
        <h1 className="text-7xl font-bold ">DevVault</h1>
        <div className="relative w-96 ">
        {/* Gradients */}
        <div className="absolute inset-x-20  bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20  bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60  bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60  bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>
        </div>
      </div>

      {/* heading */}

        <TypewriterEffectSmooth words={words} />
        {/* Search */}
        <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {/* brief info */}
       <p
            className="mt-4 font-semibold  text-neutral-300 max-w-3xl mx-auto"
            >Introducing DevVault, your ultimate destination for storing and discovering reusable code snippets. Whether you&lsquo;re in need of quick solutions or fundamental configurations, DevVault provides seamless access to a vast array of code essentials. Simplify your coding experience with our intuitive platform - where a treasure trove of solutions is just a click away.
            </p>
            </div>
            
      </div>
  )
}
