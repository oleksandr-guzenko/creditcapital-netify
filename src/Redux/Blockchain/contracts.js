import Web3 from 'web3'
import WalletLink from 'walletlink'
import CC_LOGO from '../../Assets/CC_Logo.svg'
import {USDCBnbABI, USDCBnbAddress} from './ABI/USDCBNB'
import {CCPTBnbABI, CCPTBnbAddress} from './ABI/CCPTBNB'
import {vaultLPABI, vaultLPAddress} from './ABI/VaultLP'
import {USDC_CCPT_ABI, USDC_CCPT_Address} from './ABI/USDC_CCPT'
import {Rewards_ABI, Rewards_Address} from './ABI/RewardsValut'
import {APY_ABI, APY_Address} from './ABI/APY'
import {swapABI, swapAddress} from './ABI/swapContracts'
import { adminABI, adminAddress } from './ABI/adminContract'

export const walletLink = new WalletLink({
  appName: 'Credit Capital',
  appLogoUrl: CC_LOGO,
  darkMode: 'true',
})

// Production
const RPC_URL = 'https://polygon-rpc.com/'
const CHAIN_ID = 137

// testing
// const RPC_URL = 'https://rpc-mumbai.maticvigil.com/'
// const CHAIN_ID = 80001

export const ethereum = walletLink.makeWeb3Provider(RPC_URL, CHAIN_ID)

const getContracts = (walletType) => {
  let web3 = RPC_URL
  switch (walletType) {
    case 'MetaMask':
      web3 = new Web3(window.ethereum)
      break
    case 'Coinbase':
      web3 = new Web3(ethereum)
      break
    default:
      web3 = new Web3(RPC_URL)
      break
  }

  // Testttt
  const USDCBNB = new web3.eth.Contract(USDCBnbABI, USDCBnbAddress)
  const CCPTBNB = new web3.eth.Contract(CCPTBnbABI, CCPTBnbAddress)
  const VAULTLP = new web3.eth.Contract(vaultLPABI, vaultLPAddress)
  const USDC_CCPT_TOKEN = new web3.eth.Contract(
    USDC_CCPT_ABI,
    USDC_CCPT_Address
  )
  const swap = new web3.eth.Contract(swapABI, swapAddress)
  const REWARDS_VAULT = new web3.eth.Contract(Rewards_ABI, Rewards_Address)
  const APY_VAULT = new web3.eth.Contract(APY_ABI, APY_Address)
  const adminLp = new web3.eth.Contract(adminABI, adminAddress)

  return {
    web3,
    swap,
    USDCBNB,
    CCPTBNB,
    USDC_CCPT_TOKEN,
    VAULTLP,
    REWARDS_VAULT,
    APY_VAULT,
    adminLp,
  }
}

export default getContracts
