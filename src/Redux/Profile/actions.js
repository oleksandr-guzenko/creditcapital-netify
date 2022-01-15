import { CHECK_ADMIN, CONNECT_WALLET } from './constants'
import getContracts, { ethereum, walletLink } from '../Blockchain/contracts'
// Real Network

const data = [
  {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
]

// Test Network

// const data = [
//   {
//     chainId: '0x13881',
//     chainName: 'Polygon Testnet',
//     nativeCurrency: {
//       name: 'MATIC',
//       symbol: 'MATIC',
//       decimals: 18,
//     },
//     rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
//     blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
//   },
// ]

// const data = [
//   {
//     chainId: '0x13881',
//     chainName: 'Polygon Testnet',
//     nativeCurrency: {
//       name: 'MATIC',
//       symbol: 'MATIC',
//       decimals: 18,
//     },
//     rpcUrls: ['https://matic-mumbai.chainstacklabs.com/'],
//     blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
//   },
// ]

// actions

// const bnbdata = [
//   {
//     // chainId: '0x38',
//     chainId: '0x61',
//     chainName: 'Binance Smart Chain Testnet',
//     nativeCurrency: {
//       name: 'BNB',
//       symbol: 'BNB',
//       decimals: 18,
//     },
//     // rpcUrls: ['https://bsc-dataseed.binance.org/'],
//     rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
//     blockExplorerUrls: ['https://bscscan.com/'],
//   },
// ]

export const checkAndAddNetwork = () => async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: data[0]?.chainId }],
    })
  } catch (error) {
    if (error?.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: data,
        })
      } catch (addError) {
        console.error('CheckAndAnddNetwork', addError?.message)
      }
    }
  }
}

export const connToMetaMask = () => async (dispatch) => {
  try {
    dispatch(checkAndAddNetwork())
    const userAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    localStorage.setItem('walletType', 'Metamask')
    dispatch({
      type: CONNECT_WALLET,
      payload: userAddress[0],
      walletType: 'MetaMask',
    })
  } catch (error) {
    console.error(error?.message)
  }
}

export const connToCoinbase = () => async (dispatch) => {
  try {
    const accounts = await ethereum.enable()
    localStorage.setItem('walletType', 'Coinbase')
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts[0],
      walletType: 'Coinbase',
    })
  } catch (error) {
    console.error(error?.message)
  }
}

export const disConnectWallet = () => async (dispatch, getState) => {
  const {
    profile: { userAddress, walletType },
  } = getState()
  const { web3 } = getContracts(walletType)
  localStorage.removeItem('walletType')
  await web3.currentProvider._handleDisconnect()
  walletLink.disconnect()
}

export const checkAdminAddress = () => async (dispatch, getState) => {
  const {
    profile: { userAddress },
  } = getState()

  const addresses = [
    '0x40d3CFA64B8cFED2712B71cDc4e92935D395e415',
    '0x54cf3933AB664051B52D0180D1fF25cB1A76f71e',
    '0x3F70b41F8362ffE8b6fFAE8f43924DdC0e435D1b', // Graham's Testing
    '0x34527F7B6C46cF5493C3d7760c79848E6F28C967', // James' Main
    '0x88a643a11D7319e32D35a9647d38Aad5cD4AEa34', // James' secondary
  ]

  if (userAddress) {
    const response = addresses.filter(
      (item) => item?.toLowerCase() === userAddress
    )
    if (response?.length > 0) {
      dispatch({
        type: CHECK_ADMIN,
        payload: true,
      })
    } else {
      dispatch({
        type: CHECK_ADMIN,
        payload: false,
      })
    }
  }
}
