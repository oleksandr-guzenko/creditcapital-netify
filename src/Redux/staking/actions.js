import {
  STAKE_REQUEST,
  STAKE_SUCCESS,
  STAKE_FAIL,
  UN_STAKE_REQUEST,
  UN_STAKE_SUCCESS,
  UN_STAKE_FAIL,
  CLEAR_HISTORY,
} from './constants.js'
import getContracts from '../Blockchain/contracts'
import {formateDate} from '../../Utilities/Util'
import {
  getProfileInformation,
  getProfileInformationTest,
} from '../Profile/actions.js'

export const stakingCAPL =
  (amount, transactionType, stakingType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STAKE_REQUEST,
        payload: {
          tokenAmount: amount,
          typeOfTransaction: transactionType,
          stakingType,
        },
      })
      const {
        profile: {walletType, userAddress},
      } = getState()
      const {Staking, web3, testcapl, testcret, cretStaking} =
        getContracts(walletType)
      const price = web3.utils.toWei(amount.toString(), 'ether')

      const gasPrice = await web3.eth.getGasPrice()
      const newGasPrice = web3.utils.toHex(Number(gasPrice * 2.5)?.toFixed(0))

      if (stakingType === 'CAPL_TYPE') {
        await testcapl.methods
          .approve(Staking._address, price)
          .send({from: userAddress, gasPrice: newGasPrice})

        const transaction = await Staking.methods
          .Stake(price)
          .send({from: userAddress, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash

        dispatch({
          type: STAKE_SUCCESS,
          payload: {transactionHASH: tranHash, transactionStatus: 200},
        })
        dispatch(getProfileInformation())
        dispatch(getProfileInformationTest())
      }
      if (stakingType === 'CRET_TYPE') {
        await testcret.methods
          .approve(cretStaking._address, price)
          .send({from: userAddress, gasPrice: newGasPrice})

        const transaction = await cretStaking.methods
          .Stake(price)
          .send({from: userAddress, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash

        dispatch({
          type: STAKE_SUCCESS,
          payload: {transactionHASH: tranHash, transactionStatus: 200},
        })
        dispatch(getProfileInformation())
        dispatch(getProfileInformationTest())
      }
    } catch (error) {
      dispatch({
        type: STAKE_FAIL,
        payload: error?.message,
      })
    }
  }

export const unStakingCAPL =
  (amount, transactionType, unStakeType, stakingType) =>
  async (dispatch, getState) => {
    console.log(unStakeType)
    try {
      dispatch({
        type: UN_STAKE_REQUEST,
        payload: {
          tokenAmount: amount,
          typeOfTransaction: transactionType,
          unStakeType,
          stakingType,
        },
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {Staking, web3, testccpt, cretStaking} = getContracts(walletType)
      const price = web3.utils.toWei(amount.toString(), 'ether')

      const gasPrice = await web3.eth.getGasPrice()
      const newGasPrice = web3.utils.toHex(Number(gasPrice * 2.5)?.toFixed(0))

      if (stakingType === 'CAPL_TYPE') {
        await testccpt.methods
          .approve(Staking._address, price)
          .send({from: userAddress, gasPrice: newGasPrice})
        if (unStakeType === 0) {
          const transaction = await Staking.methods
            .withdrawAndPayFees(price)
            .send({from: userAddress, gasPrice: newGasPrice})

          const tranHash = transaction.transactionHash

          dispatch({
            type: UN_STAKE_SUCCESS,
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
            type: UN_STAKE_SUCCESS,
            payload: {transactionHASH: tranHash, transactionStatus: 200},
          })
          dispatch(getProfileInformation())
          dispatch(getProfileInformationTest())
        }
      }

      if (stakingType === 'CRET_TYPE') {
        await testccpt.methods
          .approve(cretStaking._address, price)
          .send({from: userAddress, gasPrice: newGasPrice})
        if (unStakeType === 0) {
          const transaction = await cretStaking.methods
            .withdrawAndPayFees(price)
            .send({from: userAddress, gasPrice: newGasPrice})

          const tranHash = transaction.transactionHash

          dispatch({
            type: UN_STAKE_SUCCESS,
            payload: {transactionHASH: tranHash, transactionStatus: 200},
          })
          dispatch(getUnStakeCoolDownPeriod())
          dispatch(getProfileInformationTest())
        }
        if (unStakeType === 1) {
          const transaction = await cretStaking.methods
            .withdraw(price)
            .send({from: userAddress, gasPrice: newGasPrice})

          const tranHash = transaction.transactionHash

          dispatch({
            type: UN_STAKE_SUCCESS,
            payload: {transactionHASH: tranHash, transactionStatus: 200},
          })
          dispatch(getProfileInformation())
          dispatch(getProfileInformationTest())
        }
      }
    } catch (error) {
      dispatch({
        type: UN_STAKE_FAIL,
        payload: error?.message,
      })
    }
  }

export const getUnStakeCoolDownPeriod = () => async (dispatch, getState) => {
  // try {
  //   const {
  //     profile: {walletType, userAddress},
  //   } = getState()
  //   const {Staking} = getContracts(walletType)
  //   dispatch({
  //     type: UN_STAKE_TIMER_REQUEST,
  //   })
  //   const response = await Staking.methods
  //     .isavailabletowithdraw(userAddress)
  //     .call()
  //   const timeInSec = Number(response?.coolDownTimer) * 1000
  //   const currentTimeInSec = new Date().getTime()
  //   const difference = timeInSec - currentTimeInSec
  //   if (difference > 0) {
  //     const coolDownTime = formateDate(Number(response?.coolDownTimer))
  //     dispatch({
  //       type: UN_STAKE_TIMER_SUCCESS,
  //       payload: coolDownTime,
  //     })
  //   }
  //   if (response) {
  //     dispatch({
  //       type: UN_STAKE_TIMER_STATUS,
  //       payload: response?.isAvailableForwithdraw,
  //     })
  //   }
  // } catch (error) {
  //   dispatch({
  //     type: UN_STAKE_TIMER_FAIL,
  //     payload: error?.message,
  //   })
  // }
}

export const claimUnStakeWithdraw = (amount) => async (dispatch, getState) => {
  // try {
  //   const {
  //     profile: {walletType, userAddress},
  //   } = getState()
  //   const {Staking, web3} = getContracts(walletType)
  //   dispatch({
  //     type: CLAIM_WITHDRAW_REQUEST,
  //   })
  //   const price = web3.utils.toWei(amount.toString(), 'ether')
  //   const gasPrice = await web3.eth.getGasPrice()
  //   const newGasPrice = web3.utils.toHex(Number(gasPrice * 2.5)?.toFixed(0))
  //   const transaction = await Staking.methods
  //     .withdraw(price)
  //     .send({from: userAddress, gasPrice: newGasPrice})
  //   const tranHash = transaction.transactionHash
  //   dispatch({
  //     type: CLAIM_WITHDRAW_SUCCESS,
  //     payload: tranHash,
  //   })
  // } catch (error) {
  //   dispatch({
  //     type: CLAIM_WITHDRAW_FAIL,
  //     payload: error?.message,
  //   })
  // }
}

export const clearTransHistory = () => async (dispatch) => {
  dispatch({
    type: CLEAR_HISTORY,
  })
}
