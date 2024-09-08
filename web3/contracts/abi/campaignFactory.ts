export const campaignfactoryAddress ="0xa19b3922F592789e31C03f3C412842F4dC9451c1"
export const campaignFactoryAbi = [
  {
    type: "function",
    name: "campaigns",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createCampain",
    inputs: [
      { name: "cid", type: "string", internalType: "string" },
      { name: "target", type: "uint256", internalType: "uint256" },
      { name: "daysToEnd", type: "uint256", internalType: "uint256" },
      {
        name: "campaignType",
        type: "uint8",
        internalType: "enum Campaign.CampaignType",
      },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emitEvent",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "eventCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCampaignCounts",
    inputs: [{ name: "a", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "CampaignCreated",
    inputs: [
      { name: "", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CampaignCreationStarted",
    inputs: [
      {
        name: "target",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "daysToEnd",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "something",
    inputs: [{ name: "c", type: "address", internalType: "address" }],
  },
];
