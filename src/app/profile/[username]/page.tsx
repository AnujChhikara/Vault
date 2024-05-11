'use client'

import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Profile() {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const[errorMessage, setErrorMessage] = useState('')
    const [userData, setUserData] = useState<any>()
    const [loading, setLoading] = useState(true); 

    useEffect(()=>{
        const gettingUserProfile = async() =>{
            try {
                const response = await axios.get( `/api/get-user?username=${username}`)
                const data = response.data.data
                if(data){
                  setUserData(data)
                  setLoading(false);
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                console.log(axiosError.response?.data)
                setErrorMessage(axiosError.response?.data.message || 'Error fetching user profile')
                setLoading(false);
            }
        }

        if(username){
            gettingUserProfile()
        }
    },[username])


  return (
    <div className='bg-black/[0.96] min-h-screen text-white'>
     {loading ? (   
                <div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
                    <p>Loading...</p>
                </div>
            ) : userData ? (
                <div>
                  <h3>{userData.username}</h3>
                  <p>CodeCred:- {userData.codeCred}</p>
                  
                  </div>
            ) : (
                <div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
                    <p>{errorMessage}</p>
                    <Link href="/" className="p-4 bg-zinc-800 rounded-mds">
                        Home Page
                    </Link>
                </div>
            )}
    </div>
  )
}
