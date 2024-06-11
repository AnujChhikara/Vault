import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '@/context/AuthProviders';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
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