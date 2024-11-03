import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

import { PROJECT_ID } from "./config.js"

const projectId = PROJECT_ID

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const hardhat = {
  chainId: 31337,
  name: 'Hardhat',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'http://127.0.0.1:8545'
}

const morphTestnet = {
  chainId: 2810,
  name: 'Morph Holesky Testnet',
  currency: 'ETH',
  explorerUrl: 'https://explorer-holesky.morphl2.io',
  rpcUrl: 'https://rpc-quicknode-holesky.morphl2.io'
}

const metadata = {
  name: 'Project',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK

  auth: {
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
  }
})

createWeb3Modal({
  ethersConfig,
  chains: [mainnet, hardhat, morphTestnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
