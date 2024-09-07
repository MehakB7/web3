import React from 'react'
import { Button } from '@/components/ui/button'
import { useBalance } from 'wagmi'
import { useParams } from 'next/navigation'
import { Address } from 'viem'

const Owner = ({ withdraw, members = 0}: { withdraw: ()=>void, members: number} ) => {
  const params = useParams();
  const contractId = params.contractId as Address;
  const {data:accountBalance} = useBalance({address: contractId});

  const data = [
    {
      title: "Total Balance",
      value: `${accountBalance?.formatted} ${accountBalance?.symbol}` ,
    },
    {
      title: "Total Members",
      value: members.toString(),
    }
  ];

  return (
    <div className='flex flex-col border border-input bg-popover-accent w-[500px] rounded-md m-auto p-4 '>
      <div className = "flex gap-3 justify-around">
      {
        data.map(({title, value}, index)=>  (<div className ="flex justify-start flex-col justify-center items-center gap-1" key={index}>
           <h2 className='text-sm font-semibold'>{title}</h2>
           <p className='text-3xl font-bold'>{value||""}</p> </div>
        ))
      }  
      </div>
      <Button onClick={withdraw} className='mx-auto mt-4' disabled={accountBalance?.value?.toString() === "0"}>Withdraw</Button>
    </div>
  )
}


export default Owner