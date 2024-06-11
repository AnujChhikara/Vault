import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

const generateUniqueUsername = async (preferredUsername:any) => {
  let username = preferredUsername;
  let counter = 1;
  while (await UserModel.findOne({ username })) {
    username = `${preferredUsername}${counter}`;
    counter += 1;
  }
  return username;
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });

                    if (!user) {
                        throw new Error('No user found with this email');
                    }

                    if (!user.isVerified) {
                        throw new Error('Please verify your account before login');
                    }

                    if (!user.password) {
                        throw new Error('User does not have a password set');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
        params: {
            prompt: "select_account",
        },
    },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
        params: {
            prompt: "select_account",
        },
    },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            } else if (token.name) {
                await dbConnect();
                let dbUser = await UserModel.findOne({ email: token.email });

                if (!dbUser) {
                    const uniqueUsername = await generateUniqueUsername(token.name);
                    dbUser = new UserModel({
                        email: token.email,
                        username: uniqueUsername,
                        isVerified: true // Assuming OAuth users are verified
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
