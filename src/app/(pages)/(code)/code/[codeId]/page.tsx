"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowBigUp,
  Bookmark,
  BookmarkCheck,
  ChevronFirst,
  Copy,
  Save,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Code() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const params = useParams<{ codeId: string }>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [codeData, setCodeData] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [voteStatus, setVoteStatus] = useState<any>("");
  const [votes, setVotes] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);
  const codeId = params.codeId;
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getCodeDetails = async () => {
      try {
        const response = await axios.get(`/api/get-code?codeId=${codeId}`);
        const data = response.data.data;
        if (data) {
          setCodeData(data);
          setLoading(false);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data.message || "Error fetching code details"
        );
        setLoading(false);
      }
    };

    if (codeId) {
      getCodeDetails();
    }
  }, [codeId]);

  const handleDeleteCode = async () => {
    try {
      const response = await axios.delete(`/api/delete-code?codeId=${codeId}`);
      const data = response.data.data;
      if (data) {
        toast({
          title: "Deleted",
          description: "Code has been deleted successfully",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Failed!",
        description: "Failed to delete code snippet",
        variant: "destructive",
      });
      const axiosError = error as AxiosError<ApiResponse>;
      setErrorMessage(
        axiosError.response?.data.message || "Error fetching code details"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      if (codeData && codeData.owner) {
        try {
          const response = await axios.get(
            `/api/get-user?userId=${codeData.owner}`
          );
          const data = response.data.data;
          if (data) {
            setUserData(data);
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setErrorMessage(
            axiosError.response?.data.message || "Error fetching user profile"
          );
        }
      }
    };

    if (codeData) {
      getUserProfile();
    }
  }, [codeData]);

  useEffect(() => {
    const checkVoteStatus = async () => {
      if (codeData && user) {
        try {
          const response = await axios.get(
            `/api/voteStatus?codeId=${codeData._id}&userId=${user._id}`
          );
          const data = response.data.data;
          setVoteStatus(data.vote);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setErrorMessage(
            axiosError.response?.data.message || "Error fetching vote status"
          );
        }
      }
    };

    if (codeData && user) {
      checkVoteStatus();
    }
  }, [codeData, user]);

  useEffect(() => {
    const checkVotesCount = async () => {
      if (codeData) {
        try {
          const response = await axios.get(
            `/api/total-votes?codeId=${codeData._id}`
          );
          const data = response.data.data;
          setVotes(data[0].totalVotes);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setErrorMessage(
            axiosError.response?.data.message || "Error fetching vote status"
          );
        }
      }
    };

    if (codeData) {
      checkVotesCount();
    }
  }, [codeData, voteStatus]);

  useEffect(() => {
    const checkBookmarkedStatus = async () => {
      if (codeData && user) {
        try {
          const response = await axios.get(
            `/api/saveCode/saved-status?codeId=${codeData._id}&userId=${user._id}`
          );

          setIsSaved(response.data.success);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setErrorMessage(
            axiosError.response?.data.message ||
              "Error fetching bookmark status"
          );
        }
      }
    };

    if (codeData && user) {
      checkBookmarkedStatus();
    }
  }, [codeData, user]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Code has been copied to your clipboard",
    });
  };

  const handleUpvote = async () => {
    if (codeData && userData) {
      try {
        const response = await axios.get(
          `/api/upvote?codeId=${codeData._id}&userId=${user._id}`
        );
        const data = response.data.data;
        setVoteStatus(1); // Update vote status locally
        toast({
          title: "Code Upvoted",
          description: data.message,
        });
      } catch (error) {
        console.error("Error upvoting code:", error);
      }
    }
  };

  const handleDownvote = async () => {
    if (codeData && userData) {
      try {
        const response = await axios.get(
          `/api/downvote?codeId=${codeData._id}&userId=${user._id}`
        );
        const data = response.data.data;
        setVoteStatus(-1); // Update vote status locally
        toast({
          title: "Code Downvoted",
          description: data.message,
        });
      } catch (error) {
        console.error("Error downvoting code:", error);
      }
    }
  };

  const handleBookmarkCode = async () => {
    if (codeData && userData) {
      try {
        const response = await axios.post(`/api/saveCode/save-code`, {
          userId: user._id,
          codeId: codeData._id,
        });
        const data = response.data;
        setIsSaved(true);
        toast({
          title: "Code Bookmarked Successfully",
          description: data.message,
        });
      } catch (error) {
        console.error("Error bookmarking code", error);
      }
    }
  };

  const handleRemoveBookmarkCode = async () => {
    if (codeData && userData) {
      try {
        const response = await axios.delete(
          `/api/saveCode/delete-save-code?userId=${user._id}&codeId=${codeData._id}`
        );
        const data = response.data;
        setIsSaved(false);
        toast({
          title: "Code Removed from Bookmark",
          description: data.message,
        });
      } catch (error) {
        console.error("Error removing bookmark code", error);
      }
    }
  };

  return (
    <div className=' min-h-screen '>
      {loading ? (
        <div className='flex flex-col justify-center items-center space-y-4 min-h-screen'>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {codeData ? (
            <div className='flex flex-col space-y-4 md:w-5/6 items-start md:px-20 sm:px-2 md:pb-8 sm:pb-4 pt-12'>
              <div className='sm:flex md:flex sm:flex-col md:flex-row justify-between md:space-x-4 sm:space-y-4 md:space-y-0 items-start pb-6'>
                <h4 className='md:text-5xl sm:text-3xl font-semibold'>
                  {codeData.title}
                </h4>
              </div>
              <div className='flex sm:flex-wrap md:flex-row  md:sw-auto md:space-x-4 sm:space-x-2 justify-between'>
                {userData && (
                  <Link
                    className='flex items-center justify-end space-x-1'
                    href={`/profile/${userData.username}`}
                  >
                    <p className='font-semibold text-zinc-400'>by: </p>
                    <h5 className='pl-2 text-pink-600 text-xl font-bold'>
                      {userData.username}
                    </h5>
                  </Link>
                )}
                <div className='flex flex-col items-start space-y-2'>
                  <div className='flex items-center space-x-4 border border-zinc-700 px-2 py-1 rounded-3xl'>
                    {votes ? (
                      <p className='font-bold text-pink-500 w-3'>{votes} </p>
                    ) : (
                      <p className='font-bold text-pink-500 w-3 '>0</p>
                    )}{" "}
                    <p className='text-pink-500 font-bold'>votes</p>
                    {user?._id != codeData.owner && (
                      <div className='flex space-x-2 text-white items-center'>
                        {session && (
                          <>
                            <button
                              onClick={handleUpvote}
                              disabled={voteStatus === 1}
                            >
                              <ArrowBigUp
                                size={29}
                                className={
                                  voteStatus === 1
                                    ? "bg-green-600 rounded-lg"
                                    : ""
                                }
                              />
                            </button>
                            <p className='text-zinc-700'>|</p>
                            <button
                              onClick={handleDownvote}
                              disabled={voteStatus === -1}
                              className='rotate-180'
                            >
                              <ArrowBigUp
                                size={29}
                                className={
                                  voteStatus === -1
                                    ? "bg-red-500 rounded-lg"
                                    : ""
                                }
                              />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {session && (
                  <div className=''>
                    {isSaved ? (
                      <button onClick={handleRemoveBookmarkCode}>
                        <BookmarkCheck color='green' size={32} />
                      </button>
                    ) : (
                      <button onClick={handleBookmarkCode}>
                        <Bookmark size={32} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className='flex flex-col space-y-4 items-start'>
                <p className='text-xl font-semibold'>Keywords:</p>
                <div className='flex flex-wrap gap-4 items-center'>
                  {codeData.keywords
                    .split(",")
                    .map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className='bg-zinc-800 hover:bg-zinc-600  duration-500 px-2 py-1 rounded-lg'
                      >
                        {keyword}
                      </span>
                    ))}
                </div>
              </div>
              <div className='flex flex-col space-y-4 items-start'>
                <p className='text-xl font-semibold'>Dependencies</p>
                <div className='flex flex-col items-start space-y-2 rounded-lg w-full'>
                  {codeData.dependencies
                    .split(",")
                    .map((dep: string, index: number) => (
                      <span
                        key={index}
                        className='bg-zinc-800 hover:bg-zinc-600  duration-500 px-2 py-1 rounded-lg'
                      >
                        • {dep}
                      </span>
                    ))}
                </div>
              </div>
              <ScrollArea className='md:h-[600px] w-full rounded-xl bg-[#282c34] px-2 py-4'>
                <div className='flex md:justify-end sm:justify-end items-end'>
                  <button
                    onClick={() => handleCopy(codeData.code)}
                    className='pr-4 pb-4'
                  >
                    <Copy />
                  </button>
                </div>
                <div className='sm:w-80 md:w-full'>
                  <SyntaxHighlighter language='javascript' style={atomOneDark}>
                    {codeData.code}
                  </SyntaxHighlighter>
                </div>
              </ScrollArea>
              <div className='flex space-y-2 flex-col items-start'>
                <p className='text-xl'>Note:</p>
                <p className='text-zinc-200 text-sm'>{codeData.note}</p>
              </div>
              {user?._id === codeData.owner && (
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      {" "}
                      <div className='bg-red-600 hover:bg-red-600 duration-300 bg-opacity-60 px-4 py-2 rounded-lg'>
                        Delete
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='bg-black text-white border-none'>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your code snippet and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className='bg-black text-white'>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteCode}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center space-y-4 min-h-screen'>
              <p className='text-red-400'>{errorMessage}</p>
              <Link href='/' className='p-4 bg-zinc-800 rounded-mds'>
                Home Page
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
