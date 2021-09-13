import {
  LIQUIDITY_DEPOSIT_REQUEST,
  LIQUIDITY_DEPOSIT_SUCCESS,
  LIQUIDITY_DEPOSIT_FAIL,
  LIQUIDITY_WITHDRAW_REQUEST,
  LIQUIDITY_WITHDRAW_SUCCESS,
  LIQUIDITY_WITHDRAW_FAIL,
  CLEAR_TRANSACTION_HISTORY,
  COOL_DOWN_PERIOD,
  COOL_DOWN_PERIOD_R,
  CLAIM_WITHDRAW_REQUEST,
  CLAIM_WITHDRAW_SUCCESS,
  CLAIM_WITHDRAW_FAIL,
} from './constants'

import getContracts from '../Blockchain/contracts'
import {formateDate} from '../../Utilities/Util'

// actions
export const liquidityDepositAction =
  (amount, typeOfTransaction) => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {usdc, cpt, liquidityPool, web3} = getContracts(walletType)

      dispatch({
        type: LIQUIDITY_DEPOSIT_REQUEST,
        payload: {amount, typeOfTransaction},
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
  (amount, typeOfTransaction) => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {usdc, liquidityPool, web3} = getContracts(walletType)

      dispatch({
        type: LIQUIDITY_WITHDRAW_REQUEST,
        payload: {amount, typeOfTransaction},
      })

      const price = web3.utils.toWei(amount.toString())

      await usdc.methods
        .approve(liquidityPool._address, price)
        .send({from: userAddress})

      const transaction = await liquidityPool.methods
        .withdraw(price)
        .send({from: userAddress})

      const transactionHashID = transaction.transactionHash
      const tokenAmount = 0

      dispatch({
        type: LIQUIDITY_WITHDRAW_SUCCESS,
        payload: {transactionHashID, tokenAmount},
      })
      dispatch(getCoolDownPeriod())
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

    const response = await liquidityPool.methods
      .requestedTime(userAddress)
      .call()

    if (response - new Date().getTime() > 0) {
    }
    const coolDownTime = formateDate(Number(response))
    console.log(response)
    dispatch({
      type: COOL_DOWN_PERIOD,
      payload: coolDownTime,
    })
  } catch (error) {
    console.log(error?.message)
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
