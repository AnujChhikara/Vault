'use client'

import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy } from 'lucide-react';
import CodeBlock from '@/components/Sections/codeBlock';


export default function Profile() {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const[errorMessage, setErrorMessage] = useState('')
    const [userData, setUserData] = useState<any>()
    const [loading, setLoading] = useState(true); 
    const [userCodeData,setUserCodeData] = useState<any>()
    const { toast } = useToast()

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
 

  const handleClick = (code:any) =>{
     navigator.clipboard.writeText(code)
       toast({
        title:'Copied',
        description:'Code has been copied to your clipboard'
     })

  }

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

                  {
                    userCodeData && <div className='flex flex-wrap gap-8 justify-center mt-20'>
                        {userCodeData.map((code:any) =>(
                            <div key={code._id} className='gap-4'>
                            
                              <CodeBlock 
                              title={code.title}
                              id={code._id}
                              keywords = {code.keywords}
                              owner={userData.username}
                              upvote={code.upvotes}
                              />
                               
                                {/* <ScrollArea className="h-[400px] w-[350px] bg-zinc-800">
                                    <button onClick={() => handleClick(code.code)} className='flex justify-end items-end w-full pr-4'><Copy/></button>
                                    <pre className="code">{code.code}</pre>
                                    </ScrollArea> */}
                                   
                            </div>
                        ))}
                    </div>
                  }
                  
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
