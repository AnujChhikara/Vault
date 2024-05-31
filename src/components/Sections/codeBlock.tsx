
import Link from 'next/link'
import React from 'react'


export default function CodeBlock({title,id, owner,upvotes, keywords}:{title:string,id:string, owner:string,upvotes:number, keywords:string}) {

    return (
    
    <div  className="bg-[#0c0b0b]  shadow-pink-800 shadow-md p-6 w-[600px] h-[160px] rounded-lg mb-6">
              <h2 className="text-xl font-bold">{title}</h2>
      
              <div className="flex flex-wrap mb-2 mt-4">
                {keywords.split(',').map((keyword: string, index: number) => (
                  <span key={index} className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {keyword}
                  </span>
                ))}
              </div>
              <Link href={`/code/${id}`} className="text-pink-500 hover:underline">View Code</Link>
              <span className="ml-4 text-gray-400">Upvotes: {upvotes}</span>
            </div>
  
  )
}
