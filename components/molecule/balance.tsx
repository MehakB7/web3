import React from 'react'
import { Address } from 'viem'
import { useBalance } from 'wagmi'

function Balance({address}: {address: Address}) {
    const balance = useBalance({address});

  return (
    <div>balance</div>
  )
}



export default Balance
