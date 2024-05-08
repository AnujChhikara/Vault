import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='flex w-screen space-x-4 justify-end items-center pr-8'>
      <Link className='font-semibold focus:underline' href='/userAuth/login'>Log In</Link>
            <Link className=' font-semibold mt-3 mr-1' href="/userAuth/register">
              <button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-zinc-500 to-zinc-800 group-hover:from-cyan-500 group-hover:to-blue-500  text-white">
                <span className=" px-3 py-2 transition-all ease-in duration-75 bg-zinc-900 rounded-md group-hover:bg-opacity-0">
                Register
                </span>
                </button></Link>
    </div>
  )
}
