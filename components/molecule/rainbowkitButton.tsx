"use client"
import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import {Wallet} from "@/utils/lang"
import MenuBar from '@/components/molecule/menuBar'
import { Address } from 'viem'

const {connectWallet} = Wallet


export const CustonConnectButton = () => {
 return(
    <ConnectButton.Custom>
    {({ account, chain, openConnectModal, mounted }) => {
      const connected = mounted && account && chain;
      return (
        <>
          {(() => {
            if (!connected) {
              return (
                <Button
                  // className="btn btn-secondary btn-sm rounded-md"
                  onClick={openConnectModal}
                  type="button"
                >
                 {connectWallet}
                </Button>
              );
            }  
            return (
              <>
              <div className = "flex">
                <MenuBar address = {account.address as Address}/>
              </div>
              </>
            );
          })()}
        </>
      );
    }}
  </ConnectButton.Custom>
 )
}


export const NormalButton = ()=>{
    return <ConnectButton />;
}



