"use client"
import { Link2OffIcon, Wallet } from 'lucide-react';
import React, { ReactNode } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { sepolia } from 'viem/chains';

const AuthProvider = ({children}:{children: ReactNode}) => {
   
   const {isConnected} = useAccount(); 
   const chain = useChainId();

   console.log({chain})


   if(!isConnected){
    return (
    <div className="flex flex-col items-center justify-center gap-3" style={{height:"400px"}}>
      <Wallet width={48} height={48}/>
      <p className="text-center text-2xl">Please Connect Your Wallet to continue</p>
    </div>)
   }

  //  if(  chain !== sepolia.id){
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-3" style={{height:"400px"}}>
  //       <Link2OffIcon width={48} height={48}/>
  //       <p className="text-center text-2xl">Please change to Sepolia network</p>
  //     </div>)
  //  }

  return (
    <div>
      {children}
    </div> 
  )
}

export default AuthProvider