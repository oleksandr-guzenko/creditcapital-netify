import {
  TREASURY_WALLET_REQUEST,
  TREASURY_WALLET_SUCCESS,
  TREASURY_WALLET_FAIL,
  TREASURY_INFO_SUCCESS,
  TREASURY_INFO_REQUEST,
  TREASURY_AMOUNT_REQUEST,
  TREASURY_AMOUNT_SUCCESS,
  CLEAR_HISTORY,
} from './constants'

import getContracts from '../Blockchain/contracts'

const treasuryWalletAddress = '0xD4f6Cb0C1Fe07407b7098ac7Fe4265f3B2AE61f2'

// actions
export const treasuryWalletAction = (amount) => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {usdc, web3, depositUSDC} = getContracts(walletType)
    const price = web3.utils.toWei(amount.toString(), 'Mwei')
    dispatch({
      type: TREASURY_WALLET_REQUEST,
      payload: amount,
    })

    const gasPrice = await web3.eth.getGasPrice()
    const newGasPrice = web3.utils.toHex(Number(gasPrice * 1.5)?.toFixed(0))
    console.log(gasPrice * 1.5, newGasPrice, web3.utils.toHex(newGasPrice))

    await usdc.methods
      .approve(depositUSDC._address, price)
      .send({from: userAddress, gasPrice: newGasPrice})

    const transaction = await depositUSDC.methods
      .depositToken(price)
      .send({from: userAddress, gasPrice: newGasPrice})

    const tranHash = transaction.transactionHash

    const usdcAmount = web3.utils.fromWei(
      transaction.events.Deposited.returnValues.USDCAmount.toString(),
      'ether'
    )

    dispatch({
      type: TREASURY_WALLET_SUCCESS,
      payload: {tranHash, usdcAmount},
    })
  } catch (error) {
    dispatch({
      type: TREASURY_WALLET_FAIL,
      payload: error?.message,
    })
  }
}

export const treasuryInfo = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {web3, depositUSDC} = getContracts(walletType)
    dispatch({
      type: TREASURY_INFO_REQUEST,
    })

    const amount = await depositUSDC.methods.tokenBoughtUser(userAddress).call()
    const transaction = web3.utils.fromWei(amount.toString(), 'ether')

    dispatch({
      type: TREASURY_INFO_SUCCESS,
      payload: transaction,
    })
  } catch (error) {
    console.error(error?.message)
  }
}

export const totalTreasuryAmount = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType},
    } = getState()

    const {web3, depositUSDC} = getContracts(walletType)
    dispatch({
      type: TREASURY_AMOUNT_REQUEST,
    })

    const balance = await depositUSDC?.methods?.AMOUNT_RAISED()?.call()
    const totalTreasury = web3.utils.fromWei(balance.toString(), 'Mwei')

    dispatch({
      type: TREASURY_AMOUNT_SUCCESS,
      payload: totalTreasury,
    })
  } catch (error) {
    console.error(error?.message)
  }
}

export const clearHis = () => async (dispatch) => {
  dispatch({
    type: CLEAR_HISTORY,
  })
}
