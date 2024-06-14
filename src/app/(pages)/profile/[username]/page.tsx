"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CodeBlock from "@/components/Sections/codeBlock";
import {
  BadgePlus,
  ChevronFirst,
  Github,
  Linkedin,
  Loader2,
  SquarePen,
  Twitter,
  LinkIcon,
  Link2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const { toast } = useToast();
  const params = useParams<{ username: string }>();
  const username = params.username;
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [userCodeData, setUserCodeData] = useState<any>();
  const [cred, setCred] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const githubRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const twitterRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [processing, setProcessing] = useState(false);
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
  }, [userData]);

  // useEffect(() => {
  //   const fetchUserVotes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/api/userTotalVotes?userId=${userData._id}`
  //       );
  //       const data = response.data.data;
  //       setCred(data[0].totalVotes);
  //     } catch (error) {
  //       const axiosError = error as AxiosError<ApiResponse>;
  //       setErrorMessage(
  //         axiosError.response?.data.message || "Error fetching vote status"
  //       );
  //     }
  //   };

  //   if (userData) {
  //     fetchUserVotes();
  //   }
  // }, [userData]);

  useEffect(() => {
    if (user && userData) {
      if (user._id == userData._id) {
        setIsOwner(true);
      }
    }
  }, [userData, user]);

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = event.target.value;
    setCharCount(200 - newBio.length);
  };

  // updating bio
  const updateUserBio = async () => {
    setProcessing(true);
    try {
      const response = await axios.post(`/api/update-bio`, {
        userId: userData._id,
        bio: bioRef.current!.value,
      });

      const data = response.data.data;
      if (data) {
        setUserData({ ...userData, bio: bioRef.current!.value });
        toast({
          title: "Bio updated successfully",
        });
      } else {
        toast({
          title: "Bio update failed!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Bio update failed!",
        variant: "destructive",
      });
    }
    buttonRef.current?.click();
    setProcessing(false);
  };

  //connecting socials
  const connectSocials = async () => {
    setProcessing(true);
    try {
      const response = await axios.post(`/api/connect-social`, {
        userId: userData._id,
        github: githubRef.current!.value,
        linkedin: linkedinRef.current!.value,
        twitter: twitterRef.current!.value,
        website: websiteRef.current!.value,
      });

      const data = response.data.data;
      if (data) {
        setUserData({
          ...userData,
          social: {
            github: githubRef.current!.value,
            linkedin: linkedinRef.current!.value,
            twitter: twitterRef.current!.value,
            website: websiteRef.current!.value,
          },
        });
        toast({
          title: "Social connected successfully",
        });
      } else {
        toast({
          title: "Social connection failed!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Social connection failed!",
        variant: "destructive",
      });
    }
    buttonRef.current?.click();
    setProcessing(false);
  };

  return (
    <div className='bg-black min-h-screen text-white'>
      {loading ? (
        <div className='flex flex-col justify-center items-center space-y-4 min-h-screen'>
          <p>Loading...</p>
        </div>
      ) : userData ? (
        <div className='flex flex-col space-y-8 md:w-5/6 sm:w-11/12 pt-4 md:items-start md:px-20 sm:px-4'>
          <div className=' text-slate-200 font-bold  hover:slate-300 duration-500  md:text-end sm:text-start pb-4'>
            <button className='inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-zinc-500 to-zinc-800   text-white'>
              <span className=' px-3 py-1.5 transition-all ease-in duration-300 bg-zinc-900 rounded-md group-hover:bg-opacity-50'>
                <Link href='/' className='flex items-center'>
                  <ChevronFirst size={20} />{" "}
                  <p className='text-[12px] font-semibold'>Home</p>
                </Link>
              </span>
            </button>
          </div>
          <div className='flex flex-col items-start space-y-4'>
            <h3 className='text-2xl font-semibold text-zinc-100'>
              {userData.username}
            </h3>
            {userData.bio ? (
              <div className='bg-[#1b1b1b] md:p-4 sm:p-2 rounded-lg flex space-x-2 md:items-center'>
                <p className='text-sm text-zinc-300 sm:w-[250px]  break-all md:w-auto '>
                  {userData.bio}
                </p>
                {isOwner ? (
                  <div className=''>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className=''>
                          <SquarePen size={22} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:w-[340px] md:w-[425px] border-zinc-700 text-white bg-black'>
                        <DialogHeader>
                          <DialogTitle>Update Bio</DialogTitle>
                          <DialogDescription className='text-zinc-300'>
                            Update your profile information below. When
                            you&apos;re finished, click Save
                          </DialogDescription>
                        </DialogHeader>

                        <div className='flex flex-col'>
                          <Textarea
                            id='bio'
                            ref={bioRef}
                            maxLength={200}
                            placeholder='write here..'
                            defaultValue={userData.bio ? userData.bio : ""}
                            className=' bg-black border-zinc-500 '
                            rows={8}
                            onChange={handleBioChange}
                          />
                          <div className='text-right text-sm text-zinc-400'>
                            {charCount == 0 ? (
                              <div className='text-red-500'>
                                {charCount} characters remaining
                              </div>
                            ) : (
                              <div>{charCount} characters remaining</div>
                            )}
                          </div>
                        </div>

                        <DialogFooter>
                          {processing ? (
                            <Button
                              className='px-6'
                              onClick={updateUserBio}
                              type='submit'
                              disabled
                            >
                              <Loader2 className='mr-2 h-4 w-4 animate-spin' />{" "}
                              saving...
                            </Button>
                          ) : (
                            <>
                              {charCount >= 0 ? (
                                <Button
                                  className='px-6'
                                  onClick={updateUserBio}
                                  type='submit'
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  className='px-6'
                                  onClick={updateUserBio}
                                  disabled
                                  variant='destructive'
                                >
                                  Save
                                </Button>
                              )}
                            </>
                          )}
                        </DialogFooter>
                        <DialogClose asChild>
                          <button ref={buttonRef} className='hidden'>
                            close
                          </button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : isOwner ? (
              <div className='bg-[#1b1b1b]  rounded-xl items-center  flex space-x-1'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='flex space-x-1 items-center'>
                      <p>Add Bio</p> <SquarePen size={20} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px] border-zinc-700 text-white bg-black'>
                    <DialogHeader>
                      <DialogTitle>Update Bio</DialogTitle>
                      <DialogDescription className='text-zinc-300'>
                        Update your profile information below. When you&apos;re
                        finished, click Save
                      </DialogDescription>
                    </DialogHeader>

                    <div className='flex flex-col'>
                      <Textarea
                        id='bio'
                        ref={bioRef}
                        maxLength={200}
                        placeholder='write here..'
                        defaultValue={userData.bio ? userData.bio : ""}
                        className=' bg-black border-zinc-500 '
                        rows={8}
                        onChange={handleBioChange}
                      />
                      <div className='text-right text-sm text-zinc-400'>
                        {charCount == 0 ? (
                          <div className='text-red-500'>
                            {charCount} characters remaining
                          </div>
                        ) : (
                          <div>{charCount} characters remaining</div>
                        )}
                      </div>
                    </div>

                    <DialogFooter>
                      {processing ? (
                        <Button
                          className='px-6'
                          onClick={updateUserBio}
                          type='submit'
                          disabled
                        >
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />{" "}
                          saving...
                        </Button>
                      ) : (
                        <>
                          {charCount >= 0 ? (
                            <Button
                              className='px-6'
                              onClick={updateUserBio}
                              type='submit'
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              className='px-6'
                              onClick={updateUserBio}
                              disabled
                              variant='destructive'
                            >
                              Save
                            </Button>
                          )}
                        </>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* //add social */}

          {userData.social ? (
            <div className=' md:p-4 sm:p-2 rounded-lg flex space-x-2 md:items-center'>
              <div className='text-sm text-zinc-300 sm:w-[250px] md:flex gap-3 sm:flex sm:flex-wrap  md:w-auto '>
                {userData.social.linkedin ? (
                  <div className=''>
                    <a
                      className='text-zinc-300 flex space-x-2 items-end'
                      href={userData.social.linkedin}
                    >
                      {" "}
                      <Linkedin />
                      <p className='font-bold'>LinkedIn</p>
                    </a>
                  </div>
                ) : (
                  <></>
                )}
                {userData.social.github ? (
                  <div className=''>
                    <a
                      className='text-zinc-300 flex space-x-2 items-end'
                      href={userData.social.github}
                    >
                      {" "}
                      <Github />
                      <p className='font-bold'>Github</p>
                    </a>
                  </div>
                ) : (
                  <></>
                )}
                {userData.social.twitter ? (
                  <div className=''>
                    <a
                      className='text-zinc-300 flex space-x-2 items-end'
                      href={userData.social.twitter}
                    >
                      <Twitter /> <p className='font-bold'>Twitter</p>
                    </a>
                  </div>
                ) : (
                  <></>
                )}
                {userData.social.website ? (
                  <div className=''>
                    <a
                      className='text-zinc-300 flex space-x-2 items-end'
                      href={userData.social.website}
                    >
                      <Link2 /> <p className='font-bold'>Website</p>
                    </a>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {isOwner ? (
                <div className=''>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className='bg-transparent'>
                        <SquarePen size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[340px] md:max-w-[425px] border-zinc-700 text-white bg-black'>
                      <DialogHeader>
                        <DialogTitle className=''>
                          Connect Your Socials
                        </DialogTitle>
                        <DialogDescription className='text-zinc-300'>
                          Connect your social accounts by entering the URLs
                          below. When you&apos;re finished, click Save.
                        </DialogDescription>
                      </DialogHeader>

                      <div className='flex  justify-between'>
                        <div className='flex flex-col space-y-2'>
                          <p className='h-8'>Github</p>
                          <p className='h-8'>LinkedIn</p>
                          <p className='h-8'>Twitter</p>
                          <p className='h-8'>Website</p>
                        </div>
                        <div className='flex flex-col space-y-2'>
                          <Input
                            ref={githubRef}
                            defaultValue={
                              userData.social?.github
                                ? userData.social.github
                                : ""
                            }
                            className='bg-black w-60 h-8'
                          />

                          <Input
                            ref={linkedinRef}
                            defaultValue={
                              userData.social?.linkedin
                                ? userData.social.linkedin
                                : ""
                            }
                            className='bg-black w-60 h-8'
                          />
                          <Input
                            ref={twitterRef}
                            defaultValue={
                              userData.social?.twitter
                                ? userData.social.twitter
                                : ""
                            }
                            className='bg-black w-60 h-8'
                          />
                          <Input
                            ref={websiteRef}
                            defaultValue={
                              userData.social?.website
                                ? userData.social.website
                                : ""
                            }
                            className='bg-black w-60 h-8'
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        {processing ? (
                          <Button
                            className='px-6'
                            onClick={connectSocials}
                            type='submit'
                            disabled
                          >
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />{" "}
                            connecting...
                          </Button>
                        ) : (
                          <Button className='px-6' onClick={connectSocials}>
                            Connect
                          </Button>
                        )}
                      </DialogFooter>
                      <DialogClose asChild>
                        <button ref={buttonRef} className='hidden'>
                          close
                        </button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : isOwner ? (
            <div className='bg-[#1b1b1b]  rounded-xl md:items-center w-20 flex space-x-1'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='flex space-x-1 items-center'>
                    <p>Connect Socials</p>{" "}
                    <BadgePlus size={20} color='#06D001' />
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:w-[380px] border-zinc-700 text-white bg-black'>
                  <DialogHeader>
                    <DialogTitle>Connect Your Socials</DialogTitle>
                    <DialogDescription className='text-zinc-300'>
                      Update your profile information below. When you&apos;re
                      finished, click Save
                    </DialogDescription>
                  </DialogHeader>

                  <div className='flex  justify-between'>
                    <div className='flex flex-col space-y-2'>
                      <p className='h-8'>Github</p>
                      <p className='h-8'>LinkedIn</p>
                      <p className='h-8'>Twitter</p>
                      <p className='h-8'>Website</p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                      <Input
                        ref={githubRef}
                        defaultValue={
                          userData.social?.github ? userData.social.github : ""
                        }
                        className='bg-black w-60 h-8'
                      />

                      <Input
                        ref={linkedinRef}
                        defaultValue={
                          userData.social?.linkedin
                            ? userData.social.linkedin
                            : ""
                        }
                        className='bg-black w-60 h-8'
                      />
                      <Input
                        ref={twitterRef}
                        defaultValue={
                          userData.social?.twitter
                            ? userData.social.twitter
                            : ""
                        }
                        className='bg-black w-60 h-8'
                      />
                      <Input
                        ref={websiteRef}
                        defaultValue={
                          userData.social?.website
                            ? userData.social.website
                            : ""
                        }
                        className='bg-black w-60 h-8'
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    {processing ? (
                      <Button
                        className='px-6'
                        onClick={connectSocials}
                        type='submit'
                        disabled
                      >
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />{" "}
                        connecting...
                      </Button>
                    ) : (
                      <Button className='px-6' onClick={connectSocials}>
                        Connect
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            ""
          )}

          <div className='flex flex-col space-y-4'>
            <p className='text-xl font-semibold underline text-zinc-200'>
              Code Snippets:
            </p>
            {userCodeData && (
              <div>
                {userCodeData.map((code: any) => (
                  <div key={code._id} className='gap-4'>
                    <CodeBlock
                      title={code.title}
                      id={code._id}
                      keywords={code.keywords}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
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
