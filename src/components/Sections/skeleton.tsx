import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonComponent() {
  return (
    <div className='flex space-x-4 justify-center items-center'>
     <Skeleton className="h-[125px] w-[250px] rounded-xl bg-[#1b1b1b]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-[#1b1b1b] " />
        <Skeleton className="h-4 w-[200px] bg-[#1b1b1b] " />
      </div>
      </div>
  )
}