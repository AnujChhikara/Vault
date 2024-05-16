'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ArrowBigUp, Copy } from 'lucide-react';

export default function Code() {
    const params = useParams<{ codeId: string }>();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [codeData, setCodeData] = useState<any>();
    const [userData, setUserData] = useState<any>();
    const [voteStatus, setVoteStatus] = useState<number>(0);
    const codeId = params.codeId;
    const { toast } = useToast();

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
                setErrorMessage(axiosError.response?.data.message || 'Error fetching code details');
                setLoading(false);
            }
        };

        if (codeId) {
            getCodeDetails();
        }
    }, [codeId]);

    useEffect(() => {
        const getUserProfile = async () => {
            if (codeData && codeData.owner) {
                try {
                    const response = await axios.get(`/api/get-user?userId=${codeData.owner}`);
                    const data = response.data.data;
                    if (data) {
                        setUserData(data);
                    }
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setErrorMessage(axiosError.response?.data.message || 'Error fetching user profile');
                }
            }
        };

        if (codeData) {
            getUserProfile();
        }
    }, [codeData]);

    useEffect(() => {
        const checkVoteStatus = async () => {
            if (codeData && userData) {
                try {
                    const response = await axios.get(`/api/voteStatus?codeId=${codeData._id}&userId=${userData._id}`);
                    const data = response.data.data;
                    setVoteStatus(data.vote);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setErrorMessage(axiosError.response?.data.message || 'Error fetching vote status');
                }
            }
        };

        if (codeData && userData) {
            checkVoteStatus();
        }
    }, [codeData, userData]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({
            title: 'Copied',
            description: 'Code has been copied to your clipboard',
        });
    };

    const handleUpvote = async () => {
        if (codeData && userData) {
            try {
                const response = await axios.get(`/api/upvote?codeId=${codeData._id}&userId=${userData._id}`);
                const data = response.data.data;
                setVoteStatus(1); // Update vote status locally
                toast({
                    title: 'Code Upvoted',
                    description: data.message,
                });
            } catch (error) {
                console.error('Error upvoting code:', error);
            }
        }
    };

    const handleDownvote = async () => {
        if (codeData && userData) {
            try {
                const response = await axios.get(`/api/downvote?codeId=${codeData._id}&userId=${userData._id}`);
                const data = response.data.data;
                setVoteStatus(-1); // Update vote status locally
                toast({
                    title: 'Code Downvoted',
                    description: data.message,
                });
            } catch (error) {
                console.error('Error downvoting code:', error);
            }
        }                              
    };

    return (
        <div className='bg-black/[0.96] min-h-screen text-white'>
            {loading ? (
                <div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
                    <p>Loading...</p>
                </div>
            ) : (
                <div>
                    {codeData ? (
                        <div className='flex flex-col space-y-4 w-5/6 items-start px-20 pt-12 pb-20'>
                            <div className='flex justify-between space-x-4 items-start pb-6'>
                                <h4 className='text-5xl font-semibold'>{codeData.title}</h4>
                                <div className='flex space-x-8'>
                                 
                                    <div className='flex space-x-2 text-white items-center'>
                                        <button onClick={handleUpvote} disabled={voteStatus === 1}>
                                            <ArrowBigUp size={40} className={voteStatus === 1 ? 'bg-green-600 rounded-lg' : ''} />
                                        </button>
                                        <button onClick={handleDownvote} disabled={voteStatus === -1} className='rotate-180'>
                                            <ArrowBigUp size={40} className={voteStatus === -1 ? 'bg-red-500 rounded-lg' : ''} />
                                        </button>
                                    </div>
                                       {userData && (
                                        <Link className='flex items-center justify-end space-x-1' href={`/profile/${userData.username}`}>
                                            <p className='font-bold text-zinc-400'>by:</p>
                                            <h5 className='underline text-xl font-bold'>{userData.username}</h5>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <p className='text-xl font-semibold'>Keywords:</p>
                                <div className='flex space-x-2'>
                                    {codeData.keywords.split(',').map((keyword: string, index: number) => (
                                        <span key={index} className='bg-zinc-800 hover:bg-zinc-600 font-semibold duration-500 px-2 py-1 rounded-lg'>
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col space-y-4 items-start'>
                                <p className='text-xl font-semibold'>Dependencies</p>
                                <div className='flex flex-col items-start space-y-2 bg-[#1b1b1b] px-2 py-4 rounded-lg w-full'>
                                    {codeData.dependencies.split(',').map((dep: string, index: number) => (
                                        <span key={index} className='bg-zinc-800 hover:bg-zinc-600 font-semibold duration-500 px-4 py-2 rounded-lg'>
                                            • {dep}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <ScrollArea className="h-[600px] w-full rounded-xl bg-[#282c34] px-2 py-4">
                                <div className='flex justify-end items-end'>
                                    <button onClick={() => handleCopy(codeData.code)} className='pr-4'>
                                        <Copy />
                                    </button>
                                </div>
                                <SyntaxHighlighter language="javascript" style={atomOneDark}>
                                    {codeData.code}
                                </SyntaxHighlighter>
                            </ScrollArea>
                            <div className='flex space-x-4 items-center'>
                                <p className='text-xl'>Note:</p>
                                <p className='text-zinc-200 text-sm'>{codeData.note}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
                            <p className='text-red-400'>{errorMessage}</p>
                            <Link href="/" className="p-4 bg-zinc-800 rounded-mds">
                                Home Page
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
