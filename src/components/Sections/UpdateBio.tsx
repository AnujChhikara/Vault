"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, SquarePen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

export default function UpdateBio({
  userData,
  setUserData,
  isOwner,
  charCount,
  setCharCount,
}: {
  userData: any;
  setUserData: any;
  isOwner: any;
  charCount: any;
  setCharCount: any;
}) {
  const { toast } = useToast();
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [processing, setProcessing] = useState(false);

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

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBio = event.target.value;
    setCharCount(200 - newBio.length);
  };

  return (
    <div>
      {" "}
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
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> saving...
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
  );
}
