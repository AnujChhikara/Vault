"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "./codeBlock";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Switch } from "@/components/ui/switch";

export default function BookmarkedCode({
  userData,
  setErrorMessage,
  isOwner,
}: {
  userData: any;
  setErrorMessage: any;
  isOwner: any;
}) {
  const [userCodeData, setUserCodeData] = useState<any>();
  const [savedSnippets, setSavedSnippets] = useState<any[]>([]);
  const [hideBookmarkedCode, setHideBookmarkedCode] = useState<boolean>(
    userData.bookmarkedStatus
  );

  //getting user saved snippets
  useEffect(() => {
    const fetchUserSavedCode = async () => {
      try {
        const response = await axios.get(
          `/api/saveCode/user-saved-code?userId=${userData._id}`
        );
        const data = response.data.data;
        setSavedSnippets(data[0].codes);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data.message || "Error fetching saved snippets "
        );
      }
    };

    if (userData) {
      fetchUserSavedCode();
    }
  }, [userData, setErrorMessage]);

  //user code snippets

  useEffect(() => {
    const fetchUserCodeSnippets = async () => {
      try {
        const response = await axios.get(
          `/api/get-userCode?userId=${userData?._id}`
        );
        const data = response.data.data;
        if (data) {
          setUserCodeData(data);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data.message ||
            "Error fetching user code snippets"
        );
      }
    };

    if (userData) {
      fetchUserCodeSnippets();
    }
  }, [userData, setErrorMessage]);

  const handleChange = async () => {
    try {
      await axios.post(`/api/toggle-bookmark`, {
        userId: userData._id,
      });

      setHideBookmarkedCode(!hideBookmarkedCode);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setErrorMessage(
        axiosError.response?.data.message || "Error fetching user code snippets"
      );
    }
  };

  return (
    <div>
      <Tabs defaultValue='code' className='md:w-auto sm:w-[310px]'>
        <TabsList className=''>
          <TabsTrigger className=' font-semibold' value='code'>
            Code Snippets
          </TabsTrigger>
          <TabsTrigger className=' font-semibold' value='saved'>
            Bookmarked Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value='code'>
          <div className='flex flex-col space-y-4'>
            {userCodeData && userCodeData.length > 0 ? (
              <div className='sm:grid pt-6 sm:grid-cols-1 sm:gap-y-1  md:grid-cols-1 md:gap-y-0 md:gap-x-4 md:gap-b-4 lg:grid-cols-2 lg:gap-r-4 lg:gap-b-4'>
                {userCodeData.map((code: any) => (
                  <div key={code._id} className=''>
                    <CodeBlock
                      title={code.title}
                      id={code._id}
                      keywords={code.keywords}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-white'>No code snippets</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value='saved'>
          {isOwner && (
            <div className='flex flex-col space-y-2 pt-3'>
              <Switch
                checked={hideBookmarkedCode == false ? true : false}
                onCheckedChange={handleChange}
              />

              <p className='text-sm font-semibold text-zinc-400'>
                {hideBookmarkedCode
                  ? "Bookmarked Code is visible to others"
                  : "Bookmarked Code is hidden to others"}
              </p>
            </div>
          )}
          {isOwner || (!isOwner && hideBookmarkedCode) ? (
            <div className='flex flex-col space-y-4'>
              {savedSnippets && savedSnippets.length > 0 ? (
                <div className='sm:grid pt-6 sm:grid-cols-1 sm:gap-y-1  md:grid-cols-1 md:gap-y-0 md:gap-x-4 md:gap-b-4 lg:grid-cols-2 lg:gap-r-4 lg:gap-b-4'>
                  {savedSnippets.map((code: any) => (
                    <div key={code._id} className=''>
                      <CodeBlock
                        title={code.title}
                        id={code._id}
                        keywords={code.keywords}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-white'>No saved snippets</p>
              )}
            </div>
          ) : (
            <p className=' font-semibold text-zinc-300'>Bookmarks are hidden</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
