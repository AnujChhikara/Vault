import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-black '>
      <Image
        src='https://res.cloudinary.com/dmurcewte/image/upload/v1683557732/cat_q3gldc.png'
        alt='dsf'
        width={300}
        height={300}
        className='md:w-96 sm:w-80'
      />
      <h1 className='md:text-5xl sm:text-3xl font-bold text-gray-100'>
        404 - Page Not Found
      </h1>
      <p className='mt-4 md:text-lg text-gray-300'>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href='/' className='mt-6 text-lg text-pink-500 hover:underline'>
        Go back home
      </Link>
    </div>
  );
}
