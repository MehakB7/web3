import React from 'react'
import { Address,formatEther } from 'viem';
import useCampaignList from '../useCampaignList';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

function CampaignTable({address}: {address: Address[]}) {
   const {data} = useCampaignList({ address: address});

   console.log({data});

  return (
    <Table className="border border-input">
    <TableCaption>A list of your campaigns.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]" ></TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Goal</TableHead>
        <TableHead>End Date</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(({id, endDate, goal, title, image, isRunning}) => (
        <TableRow key={id}>
          <TableCell className='sm:block hidden' >< img src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${image}`}/></TableCell>
          <TableCell>{title}</TableCell>
          <TableCell>{`${formatEther( BigInt(goal||0) )} ETH`}</TableCell>
          <TableCell>{new Date(Number(endDate)*1000).toDateString()}</TableCell>
          <TableCell><span className='rounded-full border border-input p-2'>{isRunning ? "Ongoing" : "Completed"}</span></TableCell>
          <TableCell>
            <Button variant="outline" asChild>
              <Link className='flex gap-4' href={`/fundme/${id}`} target='_blank'>View Campaign <ExternalLinkIcon width={16} height={16}/></Link>
            </Button>

          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}


export default CampaignTable
