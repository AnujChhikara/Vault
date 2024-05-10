'use client'

import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Profile() {
    const params = useParams<{ username: string }>();
    const username = params.username;

    useEffect(()=>{
        const gettingUserProfile = async() =>{
            try {
                const response = await axios.get<ApiResponse>( `/api/get-user?username=${username}`)
                console.log(response.data)
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                console.log(axiosError.response?.data)
            }
        }

        if(username){
            gettingUserProfile()
        }
    },[username])
  return (
    <div className='bg-black/[0.96] min-h-screen text-white'>
      {username}
    </div>
  )
}
