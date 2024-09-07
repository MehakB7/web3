import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import DonateModel from "./donateModel";
import { CampaignData, CampaignInfo } from "./type";
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { CampaignType } from "../constant";
import { Campaign } from "@/utils/lang";
import { useParams } from "next/navigation";
import { campaignAbi } from "@/web3/contracts/abi/campaign";
import { Address, formatEther } from "viem";

const CampaignDetails = ({
  info,
  data,
  refetch,
}: {
  info: CampaignInfo;
  data: CampaignData;
  refetch: () => void;
}) => {
  console.log({ info, data });

  const { campainId } = useParams();

  const { address } = useAccount();

  const { isPending, writeContract, data: hash, error } = useWriteContract({});

  const onEndCampaign = () => {
    writeContract({
      address: campainId as Address,
      abi: campaignAbi,
      functionName: "endCampaign",
    });
  };

  const withdraw = () => {
    writeContract({
      address: campainId as Address,
      abi: campaignAbi,
      functionName: "withdraw",
    });
  };

  const withdrawDonated = ()=>{
    writeContract({
      address: campainId as Address,
      abi: campaignAbi,
      functionName: "withdrawByDoner",
    });
  }

  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    if (isTxSuccess) {
      refetch();
      fetchBalance();
      console.log("refetching");
    }
  }, [isTxSuccess]);


  console.log({isTxSuccess})


  const getStatus = () => {
    if (data?.isSuccess) {
      return "Success";
    } else if (data?.campaignEnded) {
      return "Completed";
    } else {
      return "Ongoing";
    }
  };

  const { data: accountBalance, refetch: fetchBalance  } = useBalance({
    address: campainId as Address,
  });

  const progress =
    (Number(data?.totalDonation || 0) / Number(data?.goal || 0)) * 100;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm  w-full sm:w-[300px]  h-min p-2 flex flex-col gap-4">
      <div className="">
        <span className="font-semibold text-xl">{`${formatEther(
          BigInt(data?.totalDonation || 0)
        )}ETH`}</span>
        /
        <span className="font-semibold text-sm">{`${formatEther(
          BigInt(data?.goal || 0)
        )}ETH`}</span>
      </div>
      <Progress value={progress > 100 ? 100 : progress} />
      <span className="text-xs"> {`${data?.totalDonars} Donars`}</span>
      <span className="rounded-full border border-input p-2 text-center">
        {getStatus()}
      </span>
      {!data?.campaignEnded && (
        <span className="text-xs">
          {`Ending on : ${new Date(
            Number(data?.endDate) * 1000
          )?.toLocaleDateString()}`}
        </span>
      )}

      <Separator />
      {data?.owner === address ? (
        <>
          {!data?.campaignEnded && (
            <Button variant={"destructive"} onClick={onEndCampaign}>
              {" "}
              End Campaign
            </Button>
          )}
          {accountBalance?.formatted != "0" && (
            <Button disabled={
              !data?.campaignEnded ||
              (!data?.isSuccess &&
              data?.campaignType == CampaignType.FIXED)} onClick={withdraw}>
              {" "}
              Withdraw Money
            </Button>
          )}
        </>
      ) : (
        <>
          {!data?.campaignEnded && (
            <DonateModel
              info={info}
              address={campainId as Address}
              refetch={refetch}
            />
          )}
        </>
      )}
      {data?.campaignEnded &&
        !data?.isSuccess &&
        data?.campaignType == CampaignType.FIXED &&
        address !== data?.owner &&
        accountBalance?.formatted != "0" &&  data?.donationAmount != 0 && (
          <Button onClick={withdrawDonated} disabled={isPending}>
            Withdraw
          </Button>
        )}
      <div className="bg-secondary rounded-md p-2">
        Note:{" "}
        {data?.campaignType == CampaignType.FIXED
          ? Campaign.fixedDescription
          : Campaign.flexibleDescription}
      </div>
    </div>
  );
};

export default CampaignDetails;
