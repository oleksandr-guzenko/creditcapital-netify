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
        .withdraw(price)
        .send({from: userAddress})

      // const tokenAmount = web3.utils.fromWei(
      //   transaction.events.Withdrawn.returnValues.amount.toString()
      // )
      const tokenAmount = 5
      const tt = transaction.events.returnValues
      console.log(transaction, tt)
      const transactionHashID = 'ascascascsa'

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

export const clearTransactionHistory = () => async (dispatch) => {
  dispatch({
    type: CLEAR_TRANSACTION_HISTORY,
  })
}
