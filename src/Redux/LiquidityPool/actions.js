import {
  LIQUIDITY_DEPOSIT_REQUEST,
  LIQUIDITY_DEPOSIT_SUCCESS,
  LIQUIDITY_DEPOSIT_FAIL,
  LIQUIDITY_WITHDRAW_REQUEST,
  LIQUIDITY_WITHDRAW_SUCCESS,
  LIQUIDITY_WITHDRAW_FAIL,
  CLEAR_TRANSACTION_HISTORY,
  CLAIM_WITHDRAW_REQUEST,
  CLAIM_WITHDRAW_SUCCESS,
  CLAIM_WITHDRAW_FAIL,
  COOL_DOWN_PERIOD_REQUEST,
  COOL_DOWN_PERIOD_STATUS,
  COOL_DOWN_PERIOD_FAIL,
  COOL_DOWN_PERIOD_SUCCESS,
} from './constants'

import getContracts from '../Blockchain/contracts'
import {formateDate} from '../../Utilities/Util'

// actions
export const liquidityDepositAction =
  (amount, typeOfTransaction, tokenType) => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {usdc, liquidityPool, web3} = getContracts(walletType)

      dispatch({
        type: LIQUIDITY_DEPOSIT_REQUEST,
        payload: {amount, typeOfTransaction, tokenType},
      })

      const price = web3.utils.toWei(amount.toString())

      await usdc.methods
        .approve(liquidityPool._address, price)
        .send({from: userAddress})

      const transaction = await liquidityPool.methods
        .deposit(price)
        .send({from: userAddress})

      const tokenAmount = web3.utils.fromWei(
        transaction.events.deposited.returnValues.amount.toString()
      )
      const transactionHashID = transaction.transactionHash

      dispatch({
        type: LIQUIDITY_DEPOSIT_SUCCESS,
        payload: {transactionHashID, tokenAmount},
      })
    } catch (error) {
      dispatch({
        type: LIQUIDITY_DEPOSIT_FAIL,
        payload: error?.message,
      })
    }
  }
export const liquidityWithdrawAction =
  (amount, typeOfTransaction, tokenType) => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {usdc, liquidityPool, web3} = getContracts(walletType)

      dispatch({
        type: LIQUIDITY_WITHDRAW_REQUEST,
        payload: {amount, typeOfTransaction, tokenType},
      })

      const price = web3.utils.toWei(amount.toString())

      await usdc.methods
        .approve(liquidityPool._address, price)
        .send({from: userAddress})

      const transaction = await liquidityPool.methods
        .withdraw(price)
        .send({from: userAddress})

      const tokenAmount = web3.utils.fromWei(
        transaction.events.withdrawrequested.returnValues.amount.toString()
      )
      const transactionHashID = transaction.transactionHash

      dispatch({
        type: LIQUIDITY_WITHDRAW_SUCCESS,
        payload: {transactionHashID, tokenAmount},
      })
    } catch (error) {
      dispatch({
        type: LIQUIDITY_WITHDRAW_FAIL,
        payload: error?.message,
      })
    }
  }

export const getCoolDownPeriod = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()
    const {liquidityPool} = getContracts(walletType)
    dispatch({
      type: COOL_DOWN_PERIOD_REQUEST,
    })

    const response = await liquidityPool.methods
      .isavailabletoclaim(userAddress)
      .call()

    const timeInSec = Number(response?.coolDownTimer) * 1000
    const currentTimeInSec = new Date().getTime()
    const difference = timeInSec - currentTimeInSec

    if (difference > 0) {
      const coolDownTime = formateDate(Number(response?.coolDownTimer))
      dispatch({
        type: COOL_DOWN_PERIOD_SUCCESS,
        payload: coolDownTime,
      })
    }
    if (response?.isAvailableForClaim) {
      dispatch({
        type: COOL_DOWN_PERIOD_STATUS,
        payload: response?.isAvailableForClaim,
      })
    }
  } catch (error) {
    dispatch({
      type: COOL_DOWN_PERIOD_FAIL,
      payload: error?.message,
    })
  }
}

export const claimWithdraw = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {usdc, liquidityPool, web3} = getContracts(walletType)

    dispatch({
      type: CLAIM_WITHDRAW_REQUEST,
    })
    const res = await liquidityPool.methods.claim().call()
    console.log('wor')
    console.log(res)

    dispatch({
      type: CLAIM_WITHDRAW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CLAIM_WITHDRAW_FAIL,
      payload: error?.message,
    })
  }
}

export const clearTransactionHistory = () => async (dispatch) => {
  dispatch({
    type: CLEAR_TRANSACTION_HISTORY,
  })
}
