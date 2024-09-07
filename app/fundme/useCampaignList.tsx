import { pinata } from "@/utils/pinata";
import { campaignAbi } from "@/web3/contracts/abi/campaign";
import {  useEffect, useState } from "react";
import {  Address } from "viem";
import { useReadContracts } from "wagmi";
import { CampaignContractData, CampaignTableDataType } from "./type";

const useCampaignList = ({ address }: { address: Address[] }) => {
  const [campaignData, setCampaignData] = useState<CampaignTableDataType>([]);
  const methods = ["getCId", "getCampiagnInfo"];

  let ans = address.reduce((acc: CampaignContractData[], current) => {
    let x = methods.map((method) => ({
      abi: campaignAbi,
      address: current,
      functionName: method,
    })) as CampaignContractData[];
    acc.push(...x);
    return acc;
  }, []);

  const { data } = useReadContracts({
    contracts: ans,
    allowFailure: true,
  });

  console.log({ data });

  const getIpfsData = async (cid: string) => {
    try {
      const { data } = await pinata.gateways.get(cid);
      if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        const { image, title } = data as { image?: string; title?: string };

        console.log(data);
        return {
          image: image || "",
          title: title || "",
        };
      } else {
        return { image: "", title: "" };
      }
    } catch (e) {
      return { image: "", title: "" };
    }
  };

  console.log({ data });

  useEffect(() => {
    const createData = async () => {
      let temp: CampaignTableDataType = [];
      if (data) {
        for (let i = 0; i < data?.length; i = i + 2) {
          const ipfsData = await getIpfsData(data[i].result as string || "");
          const [goal,, endTime, hasEnded ] = data[i+1]?.result as [number, number, number, boolean];
          temp.push({
            endDate:endTime,
            isRunning: !hasEnded,
            goal: goal||0,
            image: ipfsData.image,
            title: ipfsData.title,
            id: address[Math.floor(i/2)],
          });
        }
        setCampaignData(temp);
      }
    };

    if (data) {
      createData();
    }
  }, [data]);

  return { data: campaignData };
};

export default useCampaignList;
