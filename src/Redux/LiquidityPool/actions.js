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
import {formateDate, gasPrice, priceConversion} from '../../Utilities/Util'
import {getProfileInformationTest} from '../Profile/actions'

// actions
export const liquidityDepositAction =
  (amount, typeOfTransaction, tokenType) => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {dummyUSDC, liquidityPoolCAPL, web3} = getContracts(walletType)

      dispatch({
        type: LIQUIDITY_DEPOSIT_REQUEST,
        payload: {amount, typeOfTransaction, tokenType},
      })
      const price = priceConversion('toWei', 'Mwei', amount, web3)
      const newGasPrice = await gasPrice(web3)

      await dummyUSDC.methods
        .approve(liquidityPoolCAPL._address, price)
        .send({from: userAddress, gasPrice: newGasPrice})

      const transaction = await liquidityPoolCAPL.methods
        .deposit(price)
        .send({from: userAddress, gasPrice: newGasPrice})

      const capl_amount = transaction?.events?.deposited?.returnValues?.amount
      const tokenAmount = priceConversion('fromWei', 'Mwei', capl_amount, web3)
      const transactionHashID = transaction.transactionHash

      dispatch({
        type: LIQUIDITY_DEPOSIT_SUCCESS,
        payload: {transactionHashID, tokenAmount},
      })
      dispatch(getProfileInformationTest())
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

      const {testcapl, liquidityPoolCAPL, web3} = getContracts(walletType)

      dispatch({
        type: LIQUIDITY_WITHDRAW_REQUEST,
        payload: {amount, typeOfTransaction, tokenType},
      })

      const price = priceConversion('toWei', 'Mwei', amount, web3)
      const newGasPrice = await gasPrice(web3)

      await testcapl.methods
        .approve(liquidityPoolCAPL._address, price)
        .send({from: userAddress, gasPrice: newGasPrice})

      const transaction = await liquidityPoolCAPL.methods
        .withdraw(price)
        .send({from: userAddress, gasPrice: newGasPrice})

      const capl_amount =
        transaction?.events?.withdrawRequested?.returnValues?.amount
      const tokenAmount = priceConversion('fromWei', 'Mwei', capl_amount, web3)
      const transactionHashID = transaction.transactionHash

      dispatch({
        type: LIQUIDITY_WITHDRAW_SUCCESS,
        payload: {transactionHashID, tokenAmount},
      })
      dispatch(getProfileInformationTest())
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
    const {liquidityPoolCAPL} = getContracts(walletType)
    dispatch({
      type: COOL_DOWN_PERIOD_REQUEST,
    })

    const response = await liquidityPoolCAPL.methods
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
      testProfile: {lpCAPLBalance},
    } = getState()

    const {liquidityPoolCAPL, testcapl, web3} = getContracts(walletType)

    dispatch({
      type: CLAIM_WITHDRAW_REQUEST,
      payload: {
        temporaryTokenAmount: lpCAPLBalance,
        tokenType: 'CAPL',
        typeOfTransaction: 'claim',
      },
    })
    const price = priceConversion('toWei', 'ether', lpCAPLBalance, web3)
    const newGasPrice = await gasPrice(web3, 2)

    await testcapl.methods
      .approve(liquidityPoolCAPL._address, price)
      .send({from: userAddress, gasPrice: newGasPrice})

    const res = await liquidityPoolCAPL.methods
      .claim()
      .send({from: userAddress, gasPrice: newGasPrice})

    const transactionHashID = res.transactionHash

    dispatch({
      type: CLAIM_WITHDRAW_SUCCESS,
      payload: {transactionHashID, tokenAmount: lpCAPLBalance},
    })
    dispatch(getProfileInformationTest())
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
