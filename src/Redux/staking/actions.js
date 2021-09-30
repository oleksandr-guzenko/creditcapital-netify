import {
  STAKE_CAPL_REQUEST,
  STAKE_CAPL_SUCCESS,
  STAKE_CAPL_FAIL,
  STAKE_CRET_REQUEST,
  STAKE_CRET_SUCCESS,
  STAKE_CRET_FAIL,
  UN_STAKE_CAPL_REQUEST,
  UN_STAKE_CAPL_SUCCESS,
  UN_STAKE_CAPL_FAIL,
  UN_STAKE_CRET_REQUEST,
  UN_STAKE_CRET_SUCCESS,
  UN_STAKE_CRET_FAIL,
  CLEAR_HISTORY,
  UN_STAKE_TIMER_REQUEST,
  UN_STAKE_TIMER_SUCCESS,
  UN_STAKE_TIMER_FAIL,
  UN_STAKE_TIMER_STATUS,
  CLAIM_WITHDRAW_REQUEST,
  CLAIM_WITHDRAW_SUCCESS,
  CLAIM_WITHDRAW_FAIL,
} from './constansts.js'
import getContracts from '../Blockchain/contracts'
import {formateDate} from '../../Utilities/Util'
import {getProfileInformation, getProfileInformationTest} from '../Profile/actions.js'

export const stakingCAPL =
  (amount, transactionType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STAKE_CAPL_REQUEST,
        payload: {tokenAmount: amount, typeOfTransaction: transactionType},
      })
      const {
        profile: {walletType, userAddress},
      } = getState()
      const {Staking, web3, testcapl} = getContracts(walletType)
      const price = web3.utils.toWei(amount.toString(), 'ether')

      const gasPrice = await web3.eth.getGasPrice()
      const newGasPrice = web3.utils.toHex(Number(gasPrice * 2.5)?.toFixed(0))

      await testcapl.methods
        .approve(Staking._address, price)
        .send({from: userAddress, gasPrice: newGasPrice})

      const transaction = await Staking.methods
        .Stake(price)
        .send({from: userAddress, gasPrice: newGasPrice})

      const tranHash = transaction.transactionHash

      dispatch({
        type: STAKE_CAPL_SUCCESS,
        payload: {transactionHASH: tranHash, transactionStatus: 200},
      })
      dispatch(getProfileInformation())
      dispatch(getProfileInformationTest())
    } catch (error) {
      dispatch({
        type: STAKE_CAPL_FAIL,
        payload: error?.message,
      })
    }
  }

export const unStakingCAPL =
  (amount, transactionType, unStakeType) => async (dispatch, getState) => {
    console.log(unStakeType)
    try {
      dispatch({
        type: UN_STAKE_CAPL_REQUEST,
        payload: {
          tokenAmount: amount,
          typeOfTransaction: transactionType,
          unStakeType,
        },
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {Staking, web3, testccpt} = getContracts(walletType)
      const price = web3.utils.toWei(amount.toString(), 'ether')

      const gasPrice = await web3.eth.getGasPrice()
      const newGasPrice = web3.utils.toHex(Number(gasPrice * 2.5)?.toFixed(0))

      await testccpt.methods
        .approve(Staking._address, price)
        .send({from: userAddress, gasPrice: newGasPrice})

      if (unStakeType === 0) {
        const transaction = await Staking.methods
          .withdrawAndPayFees(price)
          .send({from: userAddress, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash

        dispatch({
          type: UN_STAKE_CAPL_SUCCESS,
          payload: {transactionHASH: tranHash, transactionStatus: 200},
        })
        dispatch(getUnStakeCoolDownPeriod())
        dispatch(getProfileInformationTest())
      }
      if (unStakeType === 1) {
        const transaction = await Staking.methods
          .withdraw(price)
          .send({from: userAddress, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash

        dispatch({
          type: UN_STAKE_CAPL_SUCCESS,
          payload: {transactionHASH: tranHash, transactionStatus: 200},
        })
        dispatch(getProfileInformation())
        dispatch(getProfileInformationTest())
      }
    } catch (error) {
      dispatch({
        type: UN_STAKE_CAPL_FAIL,
        payload: error?.message,
      })
    }
  }

export const getUnStakeCoolDownPeriod = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()
    const {Staking} = getContracts(walletType)

    dispatch({
      type: UN_STAKE_TIMER_REQUEST,
    })

    const response = await Staking.methods
      .isavailabletowithdraw(userAddress)
      .call()

    const timeInSec = Number(response?.coolDownTimer) * 1000
    const currentTimeInSec = new Date().getTime()
    const difference = timeInSec - currentTimeInSec

    if (difference > 0) {
      const coolDownTime = formateDate(Number(response?.coolDownTimer))
      dispatch({
        type: UN_STAKE_TIMER_SUCCESS,
        payload: coolDownTime,
      })
    }
    if (response) {
      dispatch({
        type: UN_STAKE_TIMER_STATUS,
        payload: response?.isAvailableForwithdraw,
      })
    }
  } catch (error) {
    dispatch({
      type: UN_STAKE_TIMER_FAIL,
      payload: error?.message,
    })
  }
}

export const claimUnStakeWithdraw = (amount) => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {Staking, web3} = getContracts(walletType)

    dispatch({
      type: CLAIM_WITHDRAW_REQUEST,
    })

    const price = web3.utils.toWei(amount.toString(), 'ether')

    const gasPrice = await web3.eth.getGasPrice()
    const newGasPrice = web3.utils.toHex(Number(gasPrice * 2.5)?.toFixed(0))

    const transaction = await Staking.methods
      .withdraw(price)
      .send({from: userAddress, gasPrice: newGasPrice})
    const tranHash = transaction.transactionHash

    dispatch({
      type: CLAIM_WITHDRAW_SUCCESS,
      payload: tranHash,
    })
  } catch (error) {
    dispatch({
      type: CLAIM_WITHDRAW_FAIL,
      payload: error?.message,
    })
  }
}

export const clearTransHistory = () => async (dispatch) => {
  dispatch({
    type: CLEAR_HISTORY,
  })
}
