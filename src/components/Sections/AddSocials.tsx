"use client";
import React, { useRef, useState } from "react";
import {
  BadgePlus,
  Github,
  Linkedin,
  Loader2,
  SquarePen,
  Twitter,
  Link2,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function AddSocials({
  userData,
  setUserData,
  isOwner,
}: {
  userData: any;
  isOwner: boolean;
  setUserData: any;
}) {
  const { toast } = useToast();
  const githubRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const twitterRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [processing, setProcessing] = useState(false);

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
    <div>
      {userData.social ? (
        <div className=' md:p-4 sm:p-2 rounded-lg flex space-x-2 md:items-center'>
          <div className='text-sm text-zinc-300 sm:w-[250px] md:flex gap-3 sm:flex sm:flex-wrap  md:w-auto '>
            {userData.social.linkedin ? (
              <div className='hover:bg-zinc-700 p-2 rounded-lg duration-300'>
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
              <div className='hover:bg-zinc-700 p-2 rounded-lg duration-300'>
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
              <div className='hover:bg-zinc-700 p-2 rounded-lg duration-300'>
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
              <div className='hover:bg-zinc-700 p-2 rounded-lg duration-300'>
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
                    <DialogTitle className=''>Connect Your Socials</DialogTitle>
                    <DialogDescription className='text-zinc-300'>
                      Connect your social accounts by entering the URLs below.
                      When you&apos;re finished, click Save.
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
                <p>Connect Socials</p> <BadgePlus size={20} color='#06D001' />
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
                      userData.social?.linkedin ? userData.social.linkedin : ""
                    }
                    className='bg-black w-60 h-8'
                  />
                  <Input
                    ref={twitterRef}
                    defaultValue={
                      userData.social?.twitter ? userData.social.twitter : ""
                    }
                    className='bg-black w-60 h-8'
                  />
                  <Input
                    ref={websiteRef}
                    defaultValue={
                      userData.social?.website ? userData.social.website : ""
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
    </div>
  );
}
