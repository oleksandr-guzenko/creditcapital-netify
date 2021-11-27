import {
  CONNECT_WALLET,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  TEST_PROFILE_SUCCESS,
  TEST_PROFILE_FAIL,
  TEST_PROFILE_REQ,
} from './constants'
import getContracts, {ethereum, walletLink} from '../Blockchain/contracts'
import {totalTreasuryAmount} from '../Root/actions'
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
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    blockExplorerUrls: ['https://www.polygonscan.com/'],
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
      params: [{chainId: data[0]?.chainId}],
    })
  } catch (error) {
    console.log(error)
    if (error?.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: data,
        })
      } catch (addError) {
        console.error(addError?.message)
      }
    }
  }
}

// export const checkAndAddNetworkTest = () => async (dispatch) => {
//   try {
//     await window.ethereum.request({
//       method: 'wallet_switchEthereumChain',
//       params: [{chainId: Testdata[0]?.chainId}],
//     })
//   } catch (error) {
//     console.log(error)
//     if (error?.code === 4902) {
//       try {
//         await window.ethereum.request({
//           method: 'wallet_addEthereumChain',
//           params: Testdata,
//         })
//       } catch (addError) {
//         console.error(addError?.message)
//       }
//     }
//   }
// }

export const connToMetaMask = () => async (dispatch) => {
  try {
    // dispatch(checkAndAddNetwork())
    const userAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
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
    // dispatch(checkAndAddNetwork())
    const accounts = await ethereum.enable()
    // coinbaseWeb3.eth.defaultAccount = accounts[0]
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts[0],
      walletType: 'Coinbase',
    })
  } catch (error) {
    console.error(error?.message)
  }
}
export const disConnectWallet = () => async () => {
  // web3.currentProvider._handleDisconnect();
  walletLink.disconnect()
}
export const getProfileInformation = () => async (dispatch, getState) => {
  try {
    const {
      profile: {userAddress, walletType},
    } = getState()
    dispatch({
      type: PROFILE_REQUEST,
    })
    const {web3, usdc, capl, cret, ccpt, Staking, cretStaking} =
      getContracts(walletType)

    if (userAddress) {
      // available Balance
      const balance = await usdc.methods.balanceOf(userAddress).call()
      const availableBalance = web3.utils.fromWei(balance.toString(), 'Mwei')

      // CPT and CRT
      const caplB = await capl.methods.balanceOf(userAddress).call()
      const CAPLBalance = web3.utils.fromWei(caplB.toString(), 'ether')

      const ccpftB = await ccpt.methods.balanceOf(userAddress).call()
      const CCPTBalance = web3.utils.fromWei(ccpftB.toString(), 'ether')

      const cretB = await cret.methods.balanceOf(userAddress).call()

      const CRETBalance = web3.utils.fromWei(cretB.toString(), 'ether')

      const ccptB = await Staking.methods._balancescapl(userAddress).call()
      const CAPL_CCPTBalance = web3.utils.fromWei(ccptB.toString(), 'ether')

      const ccptStakingCRET = await cretStaking.methods
        ._balancescret(userAddress)
        .call()
      const CRET_CCPTBalance = web3.utils.fromWei(
        ccptStakingCRET.toString(),
        'ether'
      )

      // rewards
      const rew = await Staking.methods._balancesccpt(userAddress).call()
      const caplRewards = web3.utils.fromWei(rew.toString(), 'ether')

      const rewss = await cretStaking.methods._balancesccpt(userAddress).call()
      const cretRewards = web3.utils.fromWei(rewss.toString(), 'ether')

      // total platform rewards
      const platformCAPL = await Staking.methods._rewardDistributed().call()
      const platformCRET = await cretStaking.methods._rewardDistributed().call()
      const a = web3.utils.fromWei(platformCAPL.toString(), 'ether')
      const b = web3.utils.fromWei(platformCRET.toString(), 'ether')
      const totalPlatRewards = Number(a) + Number(b)

      dispatch({
        type: PROFILE_SUCCESS,
        payload: {
          availableBalance: Number(availableBalance),
          CAPLBalance,
          CRETBalance,
          CAPL_CCPTBalance,
          CRET_CCPTBalance,
          CCPTBalance,
          caplRewards,
          cretRewards,
          totalRewards: Number(caplRewards) + Number(cretRewards),
          totalPlatformRewards: Number(totalPlatRewards),
        },
      })
    }
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
      payload: error?.message,
    })
  }
}

export const getProfileInformationTest = () => async (dispatch, getState) => {
  try {
    const {
      profile: {userAddress, walletType},
    } = getState()
    dispatch({
      type: TEST_PROFILE_REQ,
    })
    const {web3, liquidityPoolCAPL, liquidityPoolCRET, dummyUSDC} =
      getContracts(walletType)

    if (userAddress) {
      // available Balance
      const balance = await dummyUSDC.methods.balanceOf(userAddress).call()
      const availableBalance = web3.utils.fromWei(balance.toString(), 'Mwei')

      // lp balance
      const lpCAPL = await liquidityPoolCAPL.methods
        ._balances(userAddress)
        .call()
      const lpCRET = await liquidityPoolCRET.methods
        ._balances(userAddress)
        .call()

      const lpCAPLBalance = web3.utils.fromWei(lpCAPL.toString(), 'Mwei')
      const lpCRETBalance = web3.utils.fromWei(lpCRET.toString(), 'Mwei')

      dispatch({
        type: TEST_PROFILE_SUCCESS,
        payload: {
          testUSDC: availableBalance,
          lpCAPLBalance,
          lpCRETBalance,
        },
      })
    }
  } catch (error) {
    dispatch({
      type: TEST_PROFILE_FAIL,
      payload: error?.message,
    })
  }
}
