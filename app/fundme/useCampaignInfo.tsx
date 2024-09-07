import { campaignAbi } from "@/web3/contracts/abi/campaign";
import React from "react";
import { Abi, Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { CampaignData } from "./[campainId]/type";
import { CampaignType } from "./constant";

const useCampaignInfo = ({ address }: { address: Address }) => {

  const account = useAccount();

  const methods = [
    "getCampiagnInfo",
    "totalDonars",
  ];


  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: [...methods.map((method) => ({
      address,
      abi: campaignAbi as Abi,
      functionName: method,
    })),
    {
      address,
      abi: campaignAbi as Abi,
      functionName: "getDonarBalance",
      args: [account.address],
    },
  ],
    allowFailure: true,
  });

  console.log("Hey mehak",{data});

  const response = {} as CampaignData;

  if(data){
    /**
     *  uint256 r_goal,
            uint256 r_totalDonation,
            uint256 r_campaignEndDate,
            bool r_hasCampaignEnded,
            bool r_hasCampaignSucceed,
            address r_owner,
            Campaign.CampaignType r_ct
     */
   const [goal, r_totalDonation, endTime, campaignEnded, isSuccess, owner, campaignType] = data[0]?.result as [number, number, number,  boolean, boolean, string, CampaignType];
   response.goal = goal;
   response.endDate = endTime;
   response.campaignEnded = campaignEnded;
   response.isSuccess = isSuccess;
   response.owner = owner;
   response.campaignType = campaignType;
   response.totalDonars = data[1]?.result as number;
   response.totalDonation = r_totalDonation;
   response.donationAmount = data[2]?.result as number;
  }

  return { loading: isLoading, response,refetch };
};

export default useCampaignInfo;
