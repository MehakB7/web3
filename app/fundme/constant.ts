export enum CampaignType{
    FIXED ="0",
    FLEXIBLE="1"
}


export const options = [
    {
        label: "Fixed",
        value: CampaignType.FIXED,
    },
    {
        label: "Flexible",
        value: CampaignType.FLEXIBLE,
    },
];

export const typeHelpText = "Fixed: You can only withdraw money if you reach your goal.Flexible: You can withdraw even if you don't reach your goal.";
export const endDayHelpText = "Campaign can be run for maximum 3 months.";

export const CampaignDefaultInfo = {
    title:"",
    description:"",
    image:"",
}

export const CampaignData = {
    owner:{
        error: null,
        data: null,
    },
    cid:{
        error: null,
        data: null,
    },
    startTime:{
        error: null,
        data: null,
    },
    endDate:{
        error: null,
        data: null,
    },
    campaignEnded:{
        error: null,
        data: null,
    },
    isSuccess:{
        error: null,
        data: null,
    },
    campaignType:{
        error: null,
        data: null,
    },
}

