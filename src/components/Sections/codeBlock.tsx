import { ArrowBigUp, MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CodeBlock({title,id, owner, upvote, keywords}:{title:string,id:string, owner:string, upvote:string, keywords:string}) {
  const keywordArray = keywords.split(',').map(keyword => keyword.trim());
    return (
    <div className='border w-[600px] h-40 flex flex-col rounded-xl justify-start items-start p-4'>
    <div className='flex justify-between w-full'>
     <Link href={`/code/${id}`}><h3 className='text-xl flex font-bold text-gray-300'>{title} <p className='mt-1 ml-2 underline'> <MoveUpRight /></p></h3></Link>
     <div className='flex  space-x-2 text-white items-center'>
       {/* TODO: make buttons to upvote and downvote and check id user already clciked it or not*/}
        <p className='text-2xl text-green-400 font-bold'>{upvote}</p>
        <button><ArrowBigUp size={40} /></button>
        <button className='rotate-180'><ArrowBigUp size={40} /></button>
    </div>
        </div>
        <div>
            {keywordArray[2]}
        </div>
       <div className='flex space-x-1'><p>by:</p> 
       <Link href={`/profile/${owner}`}>{owner}</Link>
        </div>
    </div>
  )
}
