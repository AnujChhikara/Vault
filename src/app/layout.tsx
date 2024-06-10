import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '@/context/AuthProviders';
import { Analytics } from '@vercel/analytics/react';

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
        <meta
          name="google-site-verification"
          content="BAb_1Urwy9jq-4jHhPuUKGx9QlWPUhoEDGH9GQ8kQUQ"
        />
      </Head>
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}