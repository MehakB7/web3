import { Abi, Address } from "viem";


export type CampaignContractData = {
    address: Address,
    abi: Abi,
    functionName: "cid" | "endDate" | "campaignEnded" | "goal",    
}

export type CampaignTableDataType = {
    id: Address,
    image: string,
    title: string,
    goal: number,
    endDate: number,
    isRunning: boolean

}[];