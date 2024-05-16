
import Link from 'next/link'
import React from 'react'


export default function CodeBlock({title,id, owner, keywords}:{title:string,id:string, owner:string, upvote:string, keywords:string}) {

    return (
    <Link href={`/code/${id}`} className='border-double border-cyan-500 border-4 bg-zinc-800 hover:bg-zinc-900 duration-300 w-[600px] h-40 flex flex-col rounded-xl justify-around items-start p-4'>
    <div className='flex justify-between w-full'>
     <h3 className='text-xl flex font-bold'>{title}</h3>
        </div>
        <div className='flex space-x-2'>{
         keywords.split(',').map((keyword:any, index:any) => (
         <span key={index} className='bg-zinc-900 hover:bg-zinc-600 font-semibold duration-500 px-2 py-1 rounded-lg'>
        {keyword}
        </span>
        ))                                    
         }</div>
       
       <div className='flex space-x-1'><p>by:</p> 
       <Link className='underline font-bold' href={`/profile/${owner}`}>{owner}</Link>
        </div>
    </Link>
  )
}
