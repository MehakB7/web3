"use client";
import { NoData } from "@/components/molecule/noData";
import AuthProvider from "@/provider/AuthProvider";
import {
  campaignFactoryAbi,
  campaignfactoryAddress,
} from "@/web3/contracts/abi/campaignFactory";
import React from "react";
import { useAccount, useReadContract } from "wagmi";
import DonarList from "./TableWrapper";
import { Loader } from "@/components/molecule/loader";
function History() {
  // read the contract to check campaigns

  const account = useAccount();
  console.log("account", account);

  const { data, isLoading, error, refetch } = useReadContract({
    address: campaignfactoryAddress,
    abi: campaignFactoryAbi,
    functionName: "getCampaignCounts",
    args: [account.address],
  });

  return (
    <AuthProvider>
      {isLoading && <Loader />}
      <div className="flex flex-col w-screen justify-center m-auto gap-3 items-center">
        {Number(data) == 0 ? (
          <NoData />
        ) : (
          <>{data && <DonarList donar={(data as number) || 0} />}</>
        )}
      </div>
    </AuthProvider>
  );
}

export default History;
