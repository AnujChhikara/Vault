"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setClicked(true);
    e.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className='flex space-x-2 items-center'>
      <Input
        type='text'
        required
        className={`bg-transparent border-2 border-zinc-600  rounded-full text-sm md:w-96 sm:w-60  ${
          query == "" ? "input-placeholder-animation" : ""
        }`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Enter keywords to search'
      />
      {clicked ? (
        <Button
          disabled
          className='md:w-36 sm:w-24 md:py-4  md:text-xl rounded-full font-semibold hover:opacity-90 duration-300  bg-gradient-to-r from-pink-600 via-pink-700 to-pink-900'
        >
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        </Button>
      ) : (
        <Button
          className='md:w-36 sm:w-24 md:py-4 md:text-xl rounded-full font-semibold hover:opacity-90 duration-300  bg-gradient-to-r from-pink-600 via-pink-700 to-pink-900'
          type='submit'
        >
          Search
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
