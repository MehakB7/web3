import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, optimism , sepolia, localhost} from 'wagmi/chains';
const foundery  = {
  ...localhost,
  name: 'Foundery',
  id: 31337,

}

export const WagmiConfig = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '3a8170812b534d0ff9d794f19a901d64',
  chains:  [foundery, mainnet, optimism, sepolia],
  ssr: true,
});