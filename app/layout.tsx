import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import EthProvider from "@/provider/EthProvider";
import '@rainbow-me/rainbowkit/styles.css';
import { Header } from "@/components/organism/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`} >
        <EthProvider>
          <Header/>
          <Toaster/>
          {children}
        </EthProvider>  
        </body>
    </html>
  );
}
