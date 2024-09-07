import React from "react";
import { Abi, Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { Loader } from "@/components/molecule/loader";
import {
  campaignFactoryAbi,
  campaignfactoryAddress,
} from "@/web3/contracts/abi/campaignFactory";
import CampaignTable from "./campaignTable";

const TableWrapper = ({ donar }: { donar: number }) => {
  const account = useAccount();
  const contractForm = Array.from({ length: Number(donar) });
  const contracts = contractForm.map((_, index) => ({
    address: campaignfactoryAddress as Address,
    abi: campaignFactoryAbi as Abi,
    functionName: "campaigns",
    args: [account.address, index],
  }));

  const {
    data,
    isLoading,
    error: error,
  } = useReadContracts({
    contracts: contracts,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="sm:w-[80%] m-auto  rounded-md flex flex-col gap-3">
      {data && (
        <CampaignTable
          address={data?.map((item) => item.result) as Address[]}
        />
      )}
    </div>
  );
};

export default TableWrapper;
