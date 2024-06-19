"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import BookmarkedCode from "@/components/Sections/BookmarkedCode";
import AddSocials from "@/components/Sections/AddSocials";
import UpdateBio from "@/components/Sections/UpdateBio";

export default function Profile() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [cred, setCred] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [charCount, setCharCount] = useState(200);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/get-user?username=${username}`);
        const data = response.data.data;
        if (data) {
          setUserData(data);

          setCharCount(200 - (data.bio ? data.bio.length : 0));
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data.message || "Error fetching user profile"
        );
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  useEffect(() => {
    const fetchUserVotes = async () => {
      try {
        const response = await axios.get(
          `/api/userTotalVotes?userId=${userData._id}`
        );
        const data = response.data.data;
        setCred(data[0].totalVotes);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data.message || "Error fetching vote status"
        );
      }
    };

    if (userData) {
      fetchUserVotes();
    }
  }, [userData]);

  useEffect(() => {
    if (user && userData) {
      if (user._id == userData._id) {
        setIsOwner(true);
      }
    }
  }, [userData, user]);

  return (
    <div className=' min-h-screen '>
      {loading ? (
        <div className='flex flex-col justify-center items-center space-y-4 min-h-screen'>
          <p>Loading...</p>
        </div>
      ) : userData ? (
        <div className='flex flex-col space-y-8 pt-12 md:items-start '>
          <div className='flex flex-col items-start space-y-4'>
            <div className='flex space-x-3 items-center'>
              <div className='w-12 h-12 bg-[#1b1b1b] text-lg font-bold rounded-full flex justify-center items-center'>
                {userData.username.toUpperCase()[0]}
              </div>
              <h3 className='text-2xl font-semibold text-zinc-100'>
                {userData.username}
              </h3>
            </div>
            {/* Update bio */}
            <UpdateBio
              userData={userData}
              setUserData={setUserData}
              isOwner={isOwner}
              charCount={charCount}
              setCharCount={setCharCount}
            />
          </div>

          {/* //add social */}

          <AddSocials
            isOwner={isOwner}
            userData={userData}
            setUserData={setUserData}
          />

          {/* codeCreds */}

          <div className='flex items-center space-x-2'>
            <p className='font-bold text-xl'>CodeCreds:</p>
            <p className='text-lg font-semibold bg-zinc-800 px-4 rounded-xl  py-1'>
              {cred}
            </p>
            <p>
              <HoverCard>
                <HoverCardTrigger>
                  <Info size={22} />
                </HoverCardTrigger>
                <HoverCardContent className='bg-black border-none text-[12px] w-32 text-white '>
                  The cumulative votes received by one&apos;s code snippets
                </HoverCardContent>
              </HoverCard>
            </p>
            <p></p>
          </div>

          {/* code snippets and saved code snippets */}

          <BookmarkedCode
            userData={userData}
            setErrorMessage={setErrorMessage}
          />
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center space-y-4 min-h-screen'>
          <p>{errorMessage}</p>
          <Link href='/' className='p-4 bg-zinc-800 rounded-md'>
            Home Page
          </Link>
        </div>
      )}
    </div>
  );
}
