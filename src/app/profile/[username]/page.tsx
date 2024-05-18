'use client'

import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CodeBlock from '@/components/Sections/codeBlock';


export default function Profile() {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const[errorMessage, setErrorMessage] = useState('')
    const [userData, setUserData] = useState<any>()
    const [loading, setLoading] = useState(true); 
    const [userCodeData,setUserCodeData] = useState<any>()
    const[cred, setCred] = useState(0);

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

  useEffect(()=>{
        const gettingUserCodeSnippets = async() =>{
            try {
                const response = await axios.get( `/api/get-userCode?userId=${userData?._id}`)
                const data = response.data.data
                if(data){
                  setUserCodeData(data)
                  setLoading(false);
                }
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                console.log(axiosError.response?.data)
                setErrorMessage(axiosError.response?.data.message || 'Error fetching user code snippets')
                setLoading(false);
            }
        }

        if(userData){
            gettingUserCodeSnippets()
        }
    },[userData])

    useEffect(() => {
        const getUserCodesVotes = async () => {
            if (userData) {
                try {
                    const response = await axios.get(`/api/userTotalVotes?userId=${userData._id}`);
                    const data = response.data.data;
                    setCred(data[0].totalVotes)
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setErrorMessage(axiosError.response?.data.message || 'Error fetching vote status');
                }
            }
        };

        if (userData) {
            getUserCodesVotes();
        }
    }, [userData]);
 

  return (
    <div className='bg-black/[0.96] min-h-screen text-white'>
     {loading ? (   
                <div className="flex flex-col justify-center items-center space-y-4 min-h-screen">
                    <p>Loading...</p>
                </div>
            ) : userData ? (
                <div className='flex flex-col space-y-12 w-5/6  pt-12 px-20'>
                  <h3 className='text-2xl font-semibold'>Username:- {userData.username}</h3>
                  <p className='font-semibold text-2xl'>CodeCred:- {cred}</p>
                  <div className=' mt-20 flex flex-col space-y-4'>
                    <p className='text-2xl font-semibold underline'>Code Snippets:-</p>
                
                  {
                    userCodeData && <div className='flex flex-wrap gap-8 justify-start'>
                        {userCodeData.map((code:any) =>(
                            <div key={code._id} className='gap-4'>
                            
                              <CodeBlock 
                              title={code.title}
                              id={code._id}
                              keywords = {code.keywords}
                              owner={userData.username}
                              upvote={code.upvotes}
                              />
                               
                                
                                   
                            </div>
                        ))}
                    </div>
                  }
                  </div>

                  
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
