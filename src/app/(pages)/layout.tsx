"use client";
import Navbar from "@/components/Sections/Navbar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='bg-black text-white md:px-6 md:py-2 sm:px-2 sm:py-2'>
      <nav className='flex items-center p-4'>
        <Link
          href='/'
          className='font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700'
        >
          Devvault
          <hr className='border-pink-500' />
        </Link>
      </nav>

      <div className='md:px-8 sm:px-2'>{children}</div>
    </section>
  );
}
