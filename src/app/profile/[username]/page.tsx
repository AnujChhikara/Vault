'use client';

import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CodeBlock from '@/components/Sections/codeBlock';

export default function Profile() {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [userCodeData, setUserCodeData] = useState<any>();
    const [cred, setCred] = useState(0);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/get-user?username=${username}`);
                const data = response.data.data;
                if (data) {
                    setUserData(data);
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setErrorMessage(axiosError.response?.data.message || 'Error fetching user profile');
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
                const response = await axios.get(`/api/get-userCode?userId=${userData?._id}`);
                const data = response.data.data;
                if (data) {
                    setUserCodeData(data);
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setErrorMessage(axiosError.response?.data.message || 'Error fetching user code snippets');
            }
        };

        if (userData) {
            fetchUserCodeSnippets();
        }
    }, [userData]);

    useEffect(() => {
        const fetchUserVotes = async () => {
            try {
                const response = await axios.get(`/api/userTotalVotes?userId=${userData._id}`);
                const data = response.data.data;
                setCred(data[0].totalVotes);
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setErrorMessage(axiosError.response?.data.message || 'Error fetching vote status');
            }
        };

        if (userData) {
            fetchUserVotes();
        }
    }, [userData]);

    return (
        <div className='bg-black/[0.96] min-h-screen text-white'>
            {loading ? (
                <div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
                    <p>Loading...</p>
                </div>
            ) : userData ? (
                <div className='flex flex-col space-y-8 md:w-5/6 sm:w-11/12 pt-12 md:px-20 sm:px-4'>
                    <div className='flex space-x-4 items-center'>
                        
                        <h3 className='text-2xl font-semibold text-zinc-100'>@{userData.username.toUpperCase()}</h3>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <p className='text-xl font-semibold underline text-zinc-200'>Code Snippets:</p>
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
                <div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
                    <p>{errorMessage}</p>
                    <Link href="/" className="p-4 bg-zinc-800 rounded-md">
                        Home Page
                    </Link>
                </div>
            )}
        </div>
    );
}
