export const coffeeAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_owner", type: "address", internalType: "address" },
      { name: "_name", type: "string", internalType: "string" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buymeCoffee",
    inputs: [
      { name: "_name", type: "string", internalType: "string" },
      { name: "_message", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getMembersCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "members",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "message", type: "string", internalType: "string" },
      { name: "from", type: "address", internalType: "address" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owenrName",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BuyMeCoffeeEvent",
    inputs: [
      { name: "name", type: "string", indexed: false, internalType: "string" },
      {
        name: "message",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "from",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "NotOwner", inputs: [] },
];

export const coffeeAddress = "0x939363c43ae78649Cd510606C6AA9623A655696E";
