export const buymeCoffeeFectoryAddress = "0x3da5237cC08aa60Fc4B256C7C3D8F4726A395D35";

export const buymeCoffeeFactoryAbi = [
  {
    type: "function",
    name: "bmc",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract BuymeCoffee" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createBymeCoffee",
    inputs: [{ name: "_name", type: "string", internalType: "string" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBMCAddressByUserAddress",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  { type: "error", name: "UserAlreadyExist", inputs: [] },
];
