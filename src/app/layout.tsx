import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from '@/context/AuthProviders';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevVault",
  description: "DevVault - Store and Discover Code Snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="DevVault - Store and Discover Code Snippets" />
        <meta name="keywords" content="DevVault, code snippets, code storage, programming, development" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://devvault.xyz/" />
        <meta property="og:title" content="DevVault" />
        <meta property="og:description" content="Store and Discover Code Snippets" />
        <meta property="og:url" content="https://devvault.xyz/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://devvault.xyz/path-to-your-image.jpg" /> {/* Ensure this image exists */}
        
      </Head>
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}
