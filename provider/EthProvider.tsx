"use client"
import  { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from '@/web3/wagmiConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();
const EthProvider = ({  children } : {children: ReactNode}) => {
  return (
    <WagmiProvider config={WagmiConfig}>
        <QueryClientProvider client = { queryClient}>
        <RainbowKitProvider>
            {children}
        </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

EthProvider.propTypes = {}

export default EthProvider
