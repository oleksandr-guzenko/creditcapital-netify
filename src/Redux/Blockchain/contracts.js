import Web3 from 'web3'
import WalletLink from 'walletlink'
import CC_LOGO from '../../Assets/CC_Logo.svg'
import {USDCBnbABI, USDCBnbAddress} from './ABI/USDCBNB'
import {CCPTBnbABI, CCPTBnbAddress} from './ABI/CCPTBNB'
import {vaultLPABI, vaultLPAddress} from './ABI/VaultLP'
import {USDC_CCPT_ABI, USDC_CCPT_Address} from './ABI/USDC_CCPT'
import {Rewards_ABI, Rewards_Address} from './ABI/RewardsValut'

export const walletLink = new WalletLink({
  appName: 'Credit Capital',
  appLogoUrl: CC_LOGO,
  darkMode: 'true',
})

// Production
const RPC_URL = 'https://polygon-rpc.com/'
// const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const CHAIN_ID = 137
// const CHAIN_ID = 97

// testing
// const RPC_URL = 'https://rpc-mumbai.maticvigil.com/'
// const CHAIN_ID = 80001

export const ethereum = walletLink.makeWeb3Provider(RPC_URL, CHAIN_ID)

// Mainnet
const USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
const CAPLAddress = '0x2dF9071BF084863B6dAa536f4Fb304DB0FbA7fe2'
const CRETAddress = '0xf393E1ef50f19192fA03EB8a0b4142Fa6c62D0E1'
const CCPTAddress = '0x56985C6d807159eeeF685a8ae2e652F19490b7eA'
const cretStakingAddress = '0xBad9696b3Bf02d542284D907876e5d20bF070bEF'
const StakingAddress = '0x336F810531ef1f13C7F688038eA40EA68402f6fa'
const BuyCAPLAddress = '0x17D0781cc56A13E27f9fEF322345AE214a5389F5'
const BuyCRETAddress = '0x4C3C4210dEE40CA095Bf23BfaC2041e5C82804fA'
const BuyCCPTAddress = '0xE980E4C09366072fBDc2946443e1a8dEb21fb578'

// TestNet
const testCAPLAddress = '0x495338aE49F7F4e69a2C31541A41f9eAcA0f4839'
const testCRETAddress = '0xC4e0f9781af34c49DAD23257fb58aE124bDB4b4B'
const dummyUSDCAddress = '0x046bC6cBc4B74F75Fdd71fa71495fb6d125283C3'
const swapAddress = '0x2320613371A1F51c0C6Ad41152957b4000157751'

// const testCCPTAddress = '0xc4046A423b0e1DBF12E3a6bB786fFa1bDC0b1A72'
// const cretStakingAddress = '0xaf8E1ADEEe81c00aa701100850000c8D50745d35'
// const StakingAddress = '0x27eCe1fDA11E301a0d3c97F32EC7B465AB12d2Fe'
const liquidityPoolCAPLAddress = '0x99B32952936c784D5b018F4798bAE5515E7c68B8'
const liquidityPoolCRETAddress = '0x74B253769187dB633657ef7D70846fFbcFE210Ce'
// const BuyCAPLAddress = '0xCD0aB7034E066cE0ee276e6D6FD39568e8cf9bd7'
// const BuyCRETAddress = '0xEF8697ecd6463d4a20CA20DC90e8644e096aC127'

const getContracts = (walletType) => {
  let web3
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
  const REWARDS_VAULT = new web3.eth.Contract(Rewards_ABI, Rewards_Address)

  const Staking = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_ccpt',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_capl',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'isPaused',
            type: 'bool',
          },
        ],
        name: 'PauseChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'RewardCollected',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Staked',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Withdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'WithdrawnAfterPayingFees',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Stake',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: '_balancescapl',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: '_balancesccpt',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_rewardDistributed',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'canUnstake',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'capl',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'caplperccpt',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'ccpt',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'collectReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAllStakes',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'stakedTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'stakedAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'RewardAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'rewardCollectedbyUser',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'uniqueId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'UnstakePeriodOver',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'isActive',
                type: 'bool',
              },
            ],
            internalType: 'struct CAPLStaking.StakeRecord[]',
            name: '',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getStake',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lastPauseTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumHoldingPeriod',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumWithdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_paused',
            type: 'bool',
          },
        ],
        name: 'setPaused',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'stakes',
        outputs: [
          {
            internalType: 'uint256',
            name: 'stakedTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stakedAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'RewardAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewardCollectedbyUser',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'uniqueId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'UnstakePeriodOver',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'timeLeftToUnstake',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferCapl',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferCcpt',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'percentage',
            type: 'uint256',
          },
        ],
        name: 'updateCharges',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewValue',
            type: 'uint256',
          },
        ],
        name: 'updatecaplperccpt',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewPeriod',
            type: 'uint256',
          },
        ],
        name: 'updateminimumHoldingPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'withdrawAndPayFees',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawCharges',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    StakingAddress
  )

  const testcapl = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'minttoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    testCAPLAddress
  )

  const ccpt = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'burntoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'minttoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    CCPTAddress
  )

  const testcret = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'minttoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    testCRETAddress
  )

  const cretStaking = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_ccpt',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_cret',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'isPaused',
            type: 'bool',
          },
        ],
        name: 'PauseChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'RewardCollected',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Staked',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Withdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'WithdrawnAfterPayingFees',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Stake',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: '_balancesccpt',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: '_balancescret',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_rewardDistributed',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'canUnstake',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'ccpt',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'collectReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cret',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cretperccpt',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getAllStakes',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'stakedTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'stakedAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'RewardAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'rewardCollectedbyUser',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'uniqueId',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'UnstakePeriodOver',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'isActive',
                type: 'bool',
              },
            ],
            internalType: 'struct CRETStaking.StakeRecord[]',
            name: '',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'getStake',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lastPauseTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumHoldingPeriod',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumWithdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_paused',
            type: 'bool',
          },
        ],
        name: 'setPaused',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'stakes',
        outputs: [
          {
            internalType: 'uint256',
            name: 'stakedTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'stakedAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'RewardAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewardCollectedbyUser',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'uniqueId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'UnstakePeriodOver',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'timeLeftToUnstake',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferCcpt',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfercret',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'percentage',
            type: 'uint256',
          },
        ],
        name: 'updateCharges',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewValue',
            type: 'uint256',
          },
        ],
        name: 'updatecretperccpt',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewPeriod',
            type: 'uint256',
          },
        ],
        name: 'updateminimumHoldingPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'withdrawAndPayFees',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawCharges',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    cretStakingAddress
  )

  const dummyUSDC = new web3.eth.Contract(
    [
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'pure',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],

    dummyUSDCAddress
  )

  const liquidityPoolCAPL = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_capl',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_usdc',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'isPaused',
            type: 'bool',
          },
        ],
        name: 'PauseChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amountcapl',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amountusdc',
            type: 'uint256',
          },
        ],
        name: 'Withdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'deposited',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '_timestamp',
            type: 'uint256',
          },
        ],
        name: 'withdrawRequested',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: '_balances',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cancelWithdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'capl',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'coolDownPeriod',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
        ],
        name: 'isavailabletoclaim',
        outputs: [
          {
            internalType: 'uint256',
            name: 'coolDownTimer',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isAvailableForClaim',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lastPauseTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumWithdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'requestedAmount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'requestedTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_paused',
            type: 'bool',
          },
        ],
        name: 'setPaused',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfertoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferusdc',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'percentage',
            type: 'uint256',
          },
        ],
        name: 'updateCharges',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewPeriod',
            type: 'uint256',
          },
        ],
        name: 'updateCoolDownPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'usdc',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawCharges',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],

    liquidityPoolCAPLAddress
  )

  const liquidityPoolCRET = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_cret',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_usdc',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'isPaused',
            type: 'bool',
          },
        ],
        name: 'PauseChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amountcret',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amountusdc',
            type: 'uint256',
          },
        ],
        name: 'Withdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'deposited',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '_timestamp',
            type: 'uint256',
          },
        ],
        name: 'withdrawRequested',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: '_balances',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cancelWithdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'coolDownPeriod',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cret',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
        ],
        name: 'isavailabletoclaim',
        outputs: [
          {
            internalType: 'uint256',
            name: 'coolDownTimer',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isAvailableForClaim',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lastPauseTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumWithdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'requestedAmount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'requestedTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_paused',
            type: 'bool',
          },
        ],
        name: 'setPaused',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfertoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferusdc',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'percentage',
            type: 'uint256',
          },
        ],
        name: 'updateCharges',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewPeriod',
            type: 'uint256',
          },
        ],
        name: 'updateCoolDownPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'usdc',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawCharges',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    liquidityPoolCRETAddress
  )
  const swap = new web3.eth.Contract(
    [
      {
        inputs: [
          {internalType: 'address', name: '_capl', type: 'address'},
          {internalType: 'address', name: '_usdc', type: 'address'},
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [],
        name: '_index',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'capl',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'caplUsdcPair',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
          {internalType: 'uint256', name: 'duration', type: 'uint256'},
        ],
        name: 'getCapl',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
        ],
        name: 'getCaplAmount',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
          {internalType: 'uint256', name: 'duration', type: 'uint256'},
        ],
        name: 'getUSDC',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
        ],
        name: 'getUSDCAmount',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'reserves',
        outputs: [
          {internalType: 'uint112', name: '', type: 'uint112'},
          {internalType: 'uint112', name: '', type: 'uint112'},
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'swapAndLiquifyEnabled',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'uniswapV2Router',
        outputs: [
          {
            internalType: 'contract IUniswapV2Router02',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'usdc',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    swapAddress
  )

  // mainnet

  const BuyCAPL = new web3.eth.Contract(
    [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'investor',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'USDCAmount',
            type: 'uint256',
          },
        ],
        name: 'Bought',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'WithdrawnAny',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'buyToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_treasury',
            type: 'address',
          },
        ],
        name: 'updatetreasury',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'withdrawTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_USDC',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_CAPL',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_treasury',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [],
        name: 'AMOUNT_RAISED',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CAPL',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'tokenBoughtUser',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'treasury',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'USDC',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    BuyCAPLAddress
  )

  const BuyCRET = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_usdc',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_cret',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_treasury',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'investor',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'usdcAmount',
            type: 'uint256',
          },
        ],
        name: 'Bought',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'WithdrawnAny',
        type: 'event',
      },
      {
        inputs: [],
        name: 'AMOUNT_RAISED',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'buyToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cret',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'tokenBoughtUser',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'treasury',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_treasury',
            type: 'address',
          },
        ],
        name: 'updatetreasury',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'usdc',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'withdrawTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    BuyCRETAddress
  )

  const BuyCCPT = new web3.eth.Contract(
    [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'investor',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'CRETAmount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'contract IERC20',
            name: 'tokentype',
            type: 'address',
          },
        ],
        name: 'Bought',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'WithdrawnAny',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'id',
            type: 'uint8',
          },
        ],
        name: 'buyToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewValue',
            type: 'uint256',
          },
        ],
        name: 'updatetokensperccpt',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_treasury',
            type: 'address',
          },
        ],
        name: 'updatetreasury',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'withdrawTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_CRET',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_CCPT',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_CAPL',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_treasury',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [],
        name: 'CAPL',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CaplRaised',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'CaplUser',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CCPT',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CcptSold',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CRET',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CretRaised',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'CretUser',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'tokenBoughtUser',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'Tokensperccpt',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'treasury',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],

    BuyCCPTAddress
  )

  const usdc = new web3.eth.Contract(
    [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'authorizer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'nonce',
            type: 'bytes32',
          },
        ],
        name: 'AuthorizationCanceled',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'authorizer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'nonce',
            type: 'bytes32',
          },
        ],
        name: 'AuthorizationUsed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Blacklisted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'userAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address payable',
            name: 'relayerAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bytes',
            name: 'functionSignature',
            type: 'bytes',
          },
        ],
        name: 'MetaTransactionExecuted',
        type: 'event',
      },
      {anonymous: false, inputs: [], name: 'Pause', type: 'event'},
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'newRescuer',
            type: 'address',
          },
        ],
        name: 'RescuerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'previousAdminRole',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'newAdminRole',
            type: 'bytes32',
          },
        ],
        name: 'RoleAdminChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'RoleGranted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'RoleRevoked',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {indexed: true, internalType: 'address', name: 'to', type: 'address'},
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'UnBlacklisted',
        type: 'event',
      },
      {anonymous: false, inputs: [], name: 'Unpause', type: 'event'},
      {
        inputs: [],
        name: 'APPROVE_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'BLACKLISTER_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CANCEL_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DEPOSITOR_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DOMAIN_SEPARATOR',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'EIP712_VERSION',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'META_TRANSACTION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'PAUSER_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'PERMIT_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'RESCUER_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'WITHDRAW_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'approveWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'authorizer', type: 'address'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
        ],
        name: 'authorizationState',
        outputs: [
          {
            internalType: 'enum GasAbstraction.AuthorizationState',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'blacklist',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'blacklisters',
        outputs: [{internalType: 'address[]', name: '', type: 'address[]'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'authorizer', type: 'address'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'cancelAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'decrement', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'decreaseAllowanceWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'user', type: 'address'},
          {internalType: 'bytes', name: 'depositData', type: 'bytes'},
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'userAddress', type: 'address'},
          {internalType: 'bytes', name: 'functionSignature', type: 'bytes'},
          {internalType: 'bytes32', name: 'sigR', type: 'bytes32'},
          {internalType: 'bytes32', name: 'sigS', type: 'bytes32'},
          {internalType: 'uint8', name: 'sigV', type: 'uint8'},
        ],
        name: 'executeMetaTransaction',
        outputs: [{internalType: 'bytes', name: '', type: 'bytes'}],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'bytes32', name: 'role', type: 'bytes32'}],
        name: 'getRoleAdmin',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'uint256', name: 'index', type: 'uint256'},
        ],
        name: 'getRoleMember',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'bytes32', name: 'role', type: 'bytes32'}],
        name: 'getRoleMemberCount',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'hasRole',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'increment', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'increaseAllowanceWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'string', name: 'newName', type: 'string'},
          {internalType: 'string', name: 'newSymbol', type: 'string'},
          {internalType: 'uint8', name: 'newDecimals', type: 'uint8'},
          {internalType: 'address', name: 'childChainManager', type: 'address'},
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'initialized',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'isBlacklisted',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
        name: 'nonces',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pausers',
        outputs: [{internalType: 'address[]', name: '', type: 'address[]'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'deadline', type: 'uint256'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'permit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: 'tokenContract',
            type: 'address',
          },
          {internalType: 'address', name: 'to', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'rescueERC20',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'rescuers',
        outputs: [{internalType: 'address[]', name: '', type: 'address[]'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'sender', type: 'address'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'from', type: 'address'},
          {internalType: 'address', name: 'to', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'transferWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'unBlacklist',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'string', name: 'newName', type: 'string'},
          {internalType: 'string', name: 'newSymbol', type: 'string'},
        ],
        name: 'updateMetadata',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'withdrawWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    USDCAddress
  )
  const capl = new web3.eth.Contract(
    [
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {indexed: true, internalType: 'address', name: 'to', type: 'address'},
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
        name: 'minttoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'sender', type: 'address'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    CAPLAddress
  )

  const cret = new web3.eth.Contract(
    [
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {indexed: true, internalType: 'address', name: 'to', type: 'address'},
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
        name: 'minttoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'sender', type: 'address'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    CRETAddress
  )

  const depositUSDC = new web3.eth.Contract(
    [
      {
        inputs: [
          {internalType: 'address', name: '_USDC', type: 'address'},
          {internalType: 'address', name: '_CAPL', type: 'address'},
          {internalType: 'address', name: '_CRET', type: 'address'},
          {internalType: 'address', name: '_treasury', type: 'address'},
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'investor',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'USDCAmount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokentype',
            type: 'string',
          },
        ],
        name: 'Deposited',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {indexed: false, internalType: 'uint256', name: '', type: 'uint256'},
        ],
        name: 'WithdrawnAny',
        type: 'event',
      },
      {
        inputs: [],
        name: 'AMOUNT_RAISED',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
        name: 'depositToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: '', type: 'address'}],
        name: 'tokenBoughtUser',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'treasury',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: '_treasury', type: 'address'}],
        name: 'updatetreasury',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'contract IERC20', name: '_token', type: 'address'},
        ],
        name: 'withdrawTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0x18E9FF6024F382c3BD94848Fd8A8EF46Ce56263b'
  )

  return {
    web3,
    depositUSDC,
    usdc,
    ccpt,
    capl,
    cret,
    swap,
    Staking,
    testcapl,
    testcret,
    dummyUSDC,
    BuyCAPL,
    USDCBNB,
    CCPTBNB,
    USDC_CCPT_TOKEN,
    VAULTLP,
    BuyCRET,
    BuyCCPT,
    cretStaking,
    liquidityPoolCRET,
    liquidityPoolCAPL,
    REWARDS_VAULT
  }
}

export default getContracts
