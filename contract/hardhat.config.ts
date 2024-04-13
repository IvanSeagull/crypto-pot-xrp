import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config();

const xrpl = {
  url: 'https://rpc-evm-sidechain.xrpl.org',
  chainId: 1440002,
};
const private_key = process.env.PRIVATE_KEY as string;
const xrpScannerApiKey = process.env.XRPSCANNER_API_KEY as string;

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    xrpl: {
      url: xrpl.url,
      accounts: [private_key],
      chainId: xrpl.chainId,
    },
  },
  etherscan: {
    apiKey: {
      xrpl: xrpScannerApiKey,
    },
    customChains: [
      {
        network: 'xrpl',
        chainId: xrpl.chainId,
        urls: {
          apiURL: 'https://api.xrpl.org',
          browserURL: 'https://explorer.xrpl.org',
        },
      },
    ],
  },
};

export default config;
