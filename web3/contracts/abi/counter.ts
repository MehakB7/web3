export const CounterAbi = [
  {
    type: "function",
    name: "counter",
    inputs: [],
    outputs: [{ name: "", type: "int256", internalType: "int256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "dec",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "inc",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reset",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

export const CounterAddress = "0x58BC17B07769D265629CB1130c3f2D3625801c0B";