import {CONNECT_WALLET} from './constants'
import getContracts, {ethereum, walletLink} from '../Blockchain/contracts'

// actions
export const connToMetaMask = () => async (dispatch) => {
  try {
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
  walletLink.disconnect()
}
