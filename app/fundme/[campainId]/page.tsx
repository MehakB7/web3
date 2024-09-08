"use client";
import React, { useEffect } from "react";
import { pinata } from "@/utils/pinata";
import { CampaignInfo } from "./type";
import { CampaignDefaultInfo } from "../constant";
import CampaignDetails from "./campaignDetails";
import { useReadContract } from "wagmi";
import { campaignAbi } from "@/web3/contracts/abi/campaign";
import { Address } from "viem";
import { useParams } from "next/navigation";
import { Loader } from "@/components/molecule/loader";
import useCampaignInfo from "../useCampaignInfo";
import AuthProvider from "@/provider/AuthProvider";

const Campaign = () => {
  const [campaingInfo, setCampaignInfo] =
    React.useState<CampaignInfo>(CampaignDefaultInfo);
  const { campainId } = useParams();
  const { data: cid, error: cidError } = useReadContract({
    address: campainId as Address,
    abi: campaignAbi,
    functionName: "getCId",
  });
 
  const { loading, response, refetch } = useCampaignInfo({
    address: campainId as Address,
  });

  const getData = async () => {
    try {
      const data = await pinata.gateways.get(cid as string);
      if (data.data) {
        if (typeof data.data === "object" && data.data !== null && !Array.isArray(data)) {
          const { image, title, description } = data.data as { image?: string; title?: string; description?: string };
         setCampaignInfo({
          image: image || "",
          title: title || "",
          description: description || "",
        });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cid) {
      getData();
    }
  }, [cid]);

  return (
    <AuthProvider>
    <div className="flex  w-screen gap-8 px-8  ">
      {loading && <Loader />}
      <div className="flex flex-col gap-6 w-full items-center">
        <h1 className="font-bold text-3xl">{campaingInfo.title}</h1>
        <div className="flex sm:flex-row  flex-col gap-4">
          <div className="w-full sm:w-[50%] h-[400px] gap-4">
            <img
              src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${campaingInfo.image}`}
              alt="campaignImage"
              className=" object-cover w-full h-full rounded-md"
            />
            <p>{campaingInfo.description}</p>
          </div>
          <CampaignDetails info={campaingInfo} data={response} refetch={refetch}/>
        </div>
      </div>
    </div>
    </AuthProvider>
  );
};

export default Campaign;
