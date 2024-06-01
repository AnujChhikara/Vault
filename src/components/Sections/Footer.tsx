
import { Separator } from "@/components/ui/separator"
import {  Github,  Linkedin,  Twitter } from 'lucide-react'


export default function Footer() {
  return (
   <div className="flex flex-col space-y-2 py-8 sm:px-4 md:px-0 justify-center items-center">
    <p className="text-3xl text-zinc-300 font-bold">Let&lsquo;s Collaborate</p>
    <p className="text-zinc-400 pb-10">Hey there! Want to collaborate with me? Let&lsquo;s join forces and make magic happen! 💫</p>
    <button className=" p-2 rounded-lg shadow-inner shadow-white font-semibold bg-gradient-to-r from-stone-500 via-stone-600 to-stone-900 ">
        <a href="mailTo:anujchhikara07@gmail.com">Contact Me</a>
    </button>
    <div className='mt-10 w-auto flex flex-row justify-center'>
   
      <div>
       
      <Separator className="my-4 w-auto mt-10" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <a href="https://anujchhikara.vercel.app/">Portfolio</a>
        <Separator orientation="vertical" />
        <a className='flex items-center space-x-1'   href="https://twitter.com/AnujChhikara07"><Twitter /><p>Twitter</p></a>
        <Separator orientation="vertical" />
        <a className='flex items-center space-x-1' href="https://github.com/AnujChhikara"> <Github /><p>Github</p> </a>
        <Separator orientation="vertical" />
        <a className='flex items-end space-x-1' href="https://github.com/AnujChhikara"> <Linkedin /><p >LinkedIn</p> </a>
        
      </div>
    </div>
 

    </div>
    
   </div>
  );
}
