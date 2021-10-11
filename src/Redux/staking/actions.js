import {
  STAKE_REQUEST,
  STAKE_SUCCESS,
  STAKE_FAIL,
  UN_STAKE_REQUEST,
  UN_STAKE_SUCCESS,
  UN_STAKE_FAIL,
  CLEAR_HISTORY,
  STAKING_INFO_REQUEST,
  STAKING_INFO_SUCCESS,
  STAKING_INFO_FAIL,
} from './constants.js'
import getContracts from '../Blockchain/contracts'
import {
  formateDate,
  gasPrice,
  getTheTimeDifference,
  priceConversion,
} from '../../Utilities/Util'
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
      const {Staking, web3, capl, cret, cretStaking} = getContracts(walletType)

      const price = priceConversion('toWei', 'ether', amount, web3)
      const newGasPrice = await gasPrice(web3)

      if (stakingType === 'CAPL_TYPE') {
        await capl.methods
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
        dispatch(stakedInformation(stakingType))
      }
      if (stakingType === 'CRET_TYPE') {
        await cret.methods
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
        dispatch(stakedInformation(stakingType))
      }
    } catch (error) {
      dispatch({
        type: STAKE_FAIL,
        payload: error?.message,
      })
    }
  }

export const unStakingCAPL =
  (stakeID, amount, transactionType, unStakeType, stakingType) =>
  async (dispatch, getState) => {
    console.log(stakeID, amount, transactionType, unStakeType, stakingType)
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

      const {Staking, web3, cretStaking} = getContracts(walletType)
      // const newGasPrice = await gasPrice(web3)

      if (stakingType === 'CAPL_TYPE') {
        if (unStakeType === 0) {
          const transaction = await Staking.methods
            .withdrawAndPayFees(stakeID)
            .send({from: userAddress})

          const tranHash = transaction.transactionHash

          dispatch({
            type: UN_STAKE_SUCCESS,
            payload: {transactionHASH: tranHash, transactionStatus: 200},
          })

          dispatch(getProfileInformationTest())
          dispatch(stakedInformation(stakingType))
        }
        if (unStakeType === 1) {
          const transaction = await Staking.methods
            .withdraw(stakeID)
            .send({from: userAddress})
          const tranHash = transaction.transactionHash
          dispatch({
            type: UN_STAKE_SUCCESS,
            payload: {transactionHASH: tranHash, transactionStatus: 200},
          })
          dispatch(getProfileInformation())
          dispatch(getProfileInformationTest())
          dispatch(stakedInformation(stakingType))
        }
      }

      if (stakingType === 'CRET_TYPE') {
        if (unStakeType === 0) {
          const transaction = await cretStaking.methods
            .withdrawAndPayFees(stakeID)
            .send({from: userAddress})
          const tranHash = transaction.transactionHash
          dispatch({
            type: UN_STAKE_SUCCESS,
            payload: {transactionHASH: tranHash, transactionStatus: 200},
          })

          dispatch(getProfileInformationTest())
          dispatch(stakedInformation(stakingType))
        }
        if (unStakeType === 1) {
          const transaction = await cretStaking.methods
            .withdraw(stakeID)
            .send({from: userAddress})
          const tranHash = transaction.transactionHash
          dispatch({
            type: UN_STAKE_SUCCESS,
            payload: {transactionHASH: tranHash, transactionStatus: 200},
          })
          dispatch(getProfileInformation())
          dispatch(getProfileInformationTest())
          dispatch(stakedInformation(stakingType))
        }
      }
    } catch (error) {
      dispatch({
        type: UN_STAKE_FAIL,
        payload: error?.message,
      })
    }
  }

export const stakedInformation =
  (stakingType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STAKING_INFO_REQUEST,
        payload: stakingType,
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {Staking, web3, cretStaking} = getContracts(walletType)

      if (stakingType === 'CAPL_TYPE') {
        const results = []
        const data = await Staking.methods.getAllStakes(userAddress).call()
        if (data?.length > 0) {
          data?.forEach((record) =>
            results.unshift({
              stakedTime: formateDate(record[0]),
              stakedAmount: priceConversion(
                'fromWei',
                'ether',
                record[1],
                web3
              ),
              rewardAmount: priceConversion(
                'fromWei',
                'ether',
                record[2],
                web3
              ),
              rewardCollectedByUser: priceConversion(
                'fromWei',
                'ether',
                record[3],
                web3
              ),
              uniqueId: record[4],
              countDown: formateDate(record[5]),
              isAvailableForUnstake: getTheTimeDifference(record[5]),
              isActive: record[6],
            })
          )
        }
        dispatch({
          type: STAKING_INFO_SUCCESS,
          payload: results,
        })
      }
      if (stakingType === 'CRET_TYPE') {
        const data = await cretStaking.methods.getAllStakes(userAddress).call()

        const results = []
        if (data?.length > 0) {
          data?.forEach((record) =>
            results.unshift({
              stakedTime: formateDate(record[0]),
              stakedAmount: priceConversion(
                'fromWei',
                'ether',
                record[1],
                web3
              ),
              rewardAmount: priceConversion(
                'fromWei',
                'ether',
                record[2],
                web3
              ),
              rewardCollectedByUser: priceConversion(
                'fromWei',
                'ether',
                record[3],
                web3
              ),
              uniqueId: record[4],
              countDown: formateDate(record[5]),
              isAvailableForUnstake: getTheTimeDifference(record[5]),
              isActive: record[6],
            })
          )
        }
        dispatch({
          type: STAKING_INFO_SUCCESS,
          payload: results,
        })
      }
    } catch (error) {
      dispatch({
        type: STAKING_INFO_FAIL,
        payload: error?.message,
      })
    }
  }

export const clearTransHistory = () => async (dispatch) => {
  dispatch({
    type: CLEAR_HISTORY,
  })
}
