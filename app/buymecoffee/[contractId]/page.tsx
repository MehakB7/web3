"use client";
import { coffeeAbi } from "@/web3/contracts/abi/buymecoffee";
import React from "react";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import Owner from "../owner";
import Memberlist from "../memberlist";
import { MemberForm } from "../memberForm";
import AuthProvider from "@/provider/AuthProvider";
import { Loader } from "@/components/molecule/loader";
import { useParams } from "next/navigation";
import { Address } from "viem";
import { CoffeeIcon } from "@/components/icons/Coffee";

const BuyMeCoffee = () => {

 const address = useAccount();

 const params = useParams();
 const contractId = params.contractId;

 const { writeContract, data: hash, isPending } = useWriteContract();

  const { data, error, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        address: contractId as Address,
        abi: coffeeAbi,
        functionName: "owner",
      },
      {
        address: contractId as Address,
        abi: coffeeAbi,
        functionName: "owenrName",
      },
    ],
  });

  const {
    data: members,
    isLoading: membersLoading,
  } = useReadContract({
    address: contractId as Address,
    abi: coffeeAbi,
    functionName: "getMembersCount",
  });
  

  useWatchContractEvent({
    address: contractId as Address,
    abi: coffeeAbi,
    eventName: "BuyMeCoffeeEvent",
    onLogs: (data) => {
      refetch();
    },
  });

  const withdraw = async () => {
    writeContract({
      address: contractId as Address,
      abi: coffeeAbi,
      functionName: "withdraw",
    })
  };

  return (
    <AuthProvider>
      {isLoading || membersLoading ? (
        <Loader />
      ) : (
        <div className="gap-4 flex flex-col h-[300px]justity-center items-center">
          {data && address.address == data[0].result ? (
            <Owner withdraw={withdraw} members={members as number} />
          ) : (
            <>
              {data && (
                <div className="flex items-center gap-4">
                  <CoffeeIcon className="fill-white w-[30px] h-[30px]" />
                  <h1 className="font-bold text-xl">
                    {" "}
                    Buy coffee for {data[1]?.result as string}
                  </h1>
                  <CoffeeIcon className="fill-white w-[30px] h-[30px]" />
                </div>
              )}
              <MemberForm />
            </>
          )}
          {data && <Memberlist members={members as number} />}
        </div>
      )}
    </AuthProvider>
  );
};

export default BuyMeCoffee;
