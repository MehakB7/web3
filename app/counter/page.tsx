"use client";
import { Loader } from "@/components/molecule/loader";
import { Button } from "@/components/ui/button";
import AuthProvider from "@/provider/AuthProvider";
import { CounterAbi, CounterAddress } from "@/web3/contracts/abi/counter";
import { useEffect } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export default function Home() {
  const { data, isError, isLoading, refetch , error} = useReadContract({
    address: CounterAddress,
    abi: CounterAbi,
    functionName: "counter",
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const onClick = async (name: string) => {
    writeContract({
      address:CounterAddress,
      abi: CounterAbi,
      functionName: name,
    });
  };

  const {
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    fetchStatus,
  } = useWaitForTransactionReceipt({
    hash: hash,
    confirmations: 1,
  });

  useEffect(() => {
    if (isTxSuccess) {
      refetch();
    }
  }, [isTxSuccess]);

  if(isLoading) return <Loader/>;

  return (
    <AuthProvider>
      <div className="flex flex-col border border-input rounded-md items-center justify-center m-auto w-[300px] gap-4 p-4">
        {<p className="font-bold text-[90px]"> {data?.toString() as String}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => onClick("inc")}
            disabled={isPending || isTxLoading}
          >
            Increment
          </Button>
          <Button
            onClick={() => onClick("dec")}
            disabled={isPending || isTxLoading}
          >
            Decrement
          </Button>
          <Button
            onClick={() => onClick("reset")}
            disabled={isPending || isTxLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </AuthProvider>
  );
}
