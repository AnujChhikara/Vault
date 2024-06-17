import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonComponent() {
  return (
    <div className='flex flex-col space-y-4'>
      <Skeleton className='md:w-[700px] sm:w-[290px] md:h-[160px] rounded-xl bg-[#1b1b1b]' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px] bg-[#1b1b1b] ' />
        <Skeleton className='h-4 w-[200px] bg-[#1b1b1b] ' />
      </div>
    </div>
  );
}
