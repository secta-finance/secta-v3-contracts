import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import { NetworkUserConfig } from 'hardhat/types'
import 'solidity-docgen';
require('dotenv').config({ path: require('find-config')('.env') })

const lineaGoerli: NetworkUserConfig = {
  url: 'https://linea-testnet.rpc.thirdweb.com/',
  chainId: 59140,
  accounts: [process.env.KEY_TESTNET!],
}

const linea: NetworkUserConfig = {
  url: 'https://linea.rpc.thirdweb.com/',
  chainId: 59144,
  accounts: [process.env.KEY_MAINNET!],
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { lineaGoerli }),
    ...(process.env.KEY_MAINNET && { linea }),
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'lineaGoerli',
        chainId: 59140,
        urls: {
          apiURL: 'https://api-testnet.lineascan.build/api',
          browserURL: 'https://goerli.lineascan.build/',
        },
      },
      {
        network: 'linea',
        chainId: 59144,
        urls: {
          apiURL: 'https://api.lineascan.build/api',
          browserURL: 'https://lineascan.build/',
        },
      },
    ],
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
