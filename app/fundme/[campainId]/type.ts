import { CampaignType } from "../constant";

export type CampaignInfo = {
    title: string;
    description: string;
    image: string;
}

export type CampaignData = {
    goal: number;
    endDate: number;
    campaignEnded: boolean;
    isSuccess: boolean;
    campaignType: CampaignType ;  
    startDate: number;
    owner: string;
    totalDonars: number;
    totalDonation: number;
    donationAmount: number;
}