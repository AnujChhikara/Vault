'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
const placeholders = [
  'Create a responsive layout using CSS Grid',
  'Implement authentication with JWT tokens',
  'Use React Hooks to manage state in your components',
  'Build a RESTful API with Express.js',
  'Optimize images for the web using next/image',
  'Implement server-side rendering (SSR) with Next.js',
  'Deploy your application to Vercel',
  'Use Redux for state management in your React app',
];

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [place, setPlace]  = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);

    }, 4000);
    

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlace(placeholders[index]);
  }, [index]);
  

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setClicked(true);
    e.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
   <form onSubmit={handleSearch} className='flex space-x-2 items-center'>
      <Input
        type="text"
        required
        className={`bg-transparent rounded-full text-sm md:w-96 sm:w-60  ${query == ''  ? 'input-placeholder-animation' : ''}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={place}
        
      />
      {
        clicked ? <Button disabled className='md:w-36 sm:w-24 md:py-4  md:text-xl rounded-full font-semibold hover:opacity-90 duration-300  bg-gradient-to-r from-pink-600 via-pink-700 to-pink-900' >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p className='text-[12px]'> searching..</p>
             </Button> :<Button className='md:w-36 sm:w-24 md:py-4 md:text-xl rounded-full font-semibold hover:opacity-90 duration-300  bg-gradient-to-r from-pink-600 via-pink-700 to-pink-900' type="submit">
               Search
             </Button>
      }
    </form>
  );
};

export default SearchBar;
