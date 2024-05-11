import Link from 'next/link'
import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';




export default function Navbar() {
   const { data: session } = useSession();
   const user : User = session?.user as User
   const handleSignOut =() =>{
    
    signOut()
   
   }

  return (

    <div className='flex w-screen space-x-4 justify-end items-center pr-8'>
      {session ? (
          <>
            <Link href={`/profile/${user?.username}`} className="">
             <p className='underline font-semibold'> {user?.username?.toUpperCase() || user?.email}</p>
            </Link>
            
            <button onClick={handleSignOut} className="inline-flex mt-3 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-zinc-500 to-zinc-800   text-white">
                <span className=" px-3 py-2 transition-all ease-in duration-300 bg-zinc-900 rounded-md group-hover:bg-opacity-50">
                Logout
                </span>
                </button>
          </>
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
