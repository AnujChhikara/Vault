import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { PlusCircle, TrendingUp, Trophy } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"




export default function Navbar() {
   const { data: session } = useSession();
   const user : User = session?.user as User
   const handleSignOut =() =>{
    
    signOut()
   
   }

  return (

    <div className='flex w-screen space-x-4 justify-end items-center md:pr-8 sm:pr-2'>
      {session ? (
          <div className='flex space-x-3 py-4 items-start'>
             
            
            
            <HoverCard>
              <HoverCardTrigger href='/trending'  aria-label='trending'><TrendingUp size={32}/></HoverCardTrigger>
              <HoverCardContent className='bg-black border-none text-[12px] w-32 text-white '>
                Trending Codes
              </HoverCardContent>
            </HoverCard>
              <HoverCard>
              <HoverCardTrigger href={`/profile/${user?.username}`}> 
              
             <p 
             className=' w-10 h-10 flex justify-center shadow-white shadow-inner items-center font-semibold bg-gradient-to-r from-zinc-600 via-zinc-900 to-black  rounded-full duration-700 hover:underline'> 
             {user?.username![0].toUpperCase()  }
             </p>
          
              </HoverCardTrigger>
              <HoverCardContent className='bg-black border-none text-center text-[12px] w-32 text-white '>
                Profile
              </HoverCardContent>
            </HoverCard>           
            
            <HoverCard>
              <HoverCardTrigger href='/new-code' aria-label='newcode'> <PlusCircle  size={36}/></HoverCardTrigger>
              <HoverCardContent className='bg-black border-none text-[12px] w-32 text-white '>
                Add New Code
              </HoverCardContent>
          </HoverCard>
            <HoverCard>
              <HoverCardTrigger href='/leaderboard' aria-label='newcode'> 
          <Trophy color='#B4B4B8' size={32} />
            </HoverCardTrigger>
              <HoverCardContent className='bg-black border-none text-[12px] w-32 text-white '>
                Leaderboard
              </HoverCardContent>
            </HoverCard>
          
          
            <button onClick={handleSignOut} className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-zinc-500 to-zinc-800   text-white">
                <span className=" px-3 py-1.5 transition-all ease-in duration-300 bg-zinc-900 rounded-md group-hover:bg-opacity-50">
                Logout 
                </span>
                </button>
                
          </div>
        ) : (
          <>
          <Link className='font-semibold focus:underline' href='/Sign-in'>Log In</Link>
            <Link className=' font-semibold mt-3 mr-1' href="/sign-up">
              <button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-zinc-500 to-zinc-800   text-white">
                <span className=" px-3 py-2 transition-all ease-in duration-300 bg-zinc-900 rounded-md group-hover:bg-opacity-0">
                Register
                </span>
                </button></Link></>
        )}
      
    </div>
  )
}
