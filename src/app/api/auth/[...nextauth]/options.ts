import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import {UserModel} from "@/model/User";


export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:'credentials',
            name: 'Credentials',
           credentials: {
            email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {

                const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error('No user found with this email')
                    }
                    
                    if(!user.isVerified){
                        throw new Error('please verify your account before login')
                    }

                  const isPasswordCorrect =  await bcrypt.compare(credentials.password, user.password)
                  if(isPasswordCorrect){
                    return user
                  }else{
                    throw new Error('Incorrect password')
                  }
                } catch (error:any) {
                    throw new Error
                }
            }
        }),
        
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
        

    ], 
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            } else if (account?.provider === 'github' && profile) {
                await dbConnect();
                let dbUser = await UserModel.findOne({ email: profile.email });

                if (!dbUser) {
                    dbUser = new UserModel({
                        email: profile.email,
                        username: profile.login, // You can transform this data as needed
                        isVerified: true // Assuming GitHub users are verified
                    });
                    await dbUser.save();
                }

                token._id = dbUser._id.toString();
                token.isVerified = dbUser.isVerified;
                token.username = dbUser.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
            }
            return session;
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXT_AUTH_SECRET
};