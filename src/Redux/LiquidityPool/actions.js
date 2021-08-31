import {
  LIQUIDITY_DEPOSIT_REQUEST,
  LIQUIDITY_DEPOSIT_SUCCESS,
  LIQUIDITY_DEPOSIT_FAIL,
  LIQUIDITY_WITHDRAW_REQUEST,
  LIQUIDITY_WITHDRAW_SUCCESS,
  LIQUIDITY_WITHDRAW_FAIL,
  CLEAR_TRANSACTION_HISTORY,
} from './constants'

import getContracts from '../Blockchain/contracts'

// actions
export const liquidityDepositAction = (price) => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType},
    } = getState()
    const {usdc, cpt, liquidityPool, web3} = getContracts(walletType)
    dispatch({
      type: LIQUIDITY_DEPOSIT_REQUEST,
      payload: amount,
    })
    dispatch({
      type: LIQUIDITY_DEPOSIT_SUCCESS,
      payload: {transactionHashID, tokenAmount, usdcAmount, tokenType},
    })
  } catch (error) {
    dispatch({
      type: LIQUIDITY_DEPOSIT_FAIL,
      payload: error?.message,
    })
  }
}
