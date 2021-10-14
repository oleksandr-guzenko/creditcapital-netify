import {
  BUY__CPT__REQUEST,
  BUY__CPT__FAIL,
  BUY__CPT__SUCCESS,
  CLEAR_HASH_VALUE,
} from './constants'

import getContracts from '../Blockchain/contracts'
import {gasPrice, priceConversion} from '../../Utilities/Util'
import {
  getProfileInformation,
  getProfileInformationTest,
} from '../Profile/actions'
export const reserveCPTAndCRT =
  (amount, CPT, type, ccptTokenType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BUY__CPT__REQUEST,
        payload: {amount, CPT, tokenType: type, ccptTokenType},
      })
      const {
        profile: {userAddress, walletType},
      } = getState()
      const {BuyCAPL, BuyCRET, BuyCCPT, web3, usdc, capl, cret} =
        getContracts(walletType)

      const price = priceConversion('toWei', 'Mwei', amount, web3)
      // const newGasPrice = await gasPrice(web3)

      if (type === 'CAPL') {
        await usdc.methods
          .approve(BuyCAPL._address, price)
          .send({from: userAddress})

        const transaction = await BuyCAPL.methods
          .buyToken(price)
          .send({from: userAddress})
        const txHash = transaction.transactionHash

        dispatch({
          type: BUY__CPT__SUCCESS,
          transactionHash: txHash,
        })
        dispatch(getProfileInformation())
        dispatch(getProfileInformationTest())
      } else if (type === 'CRET') {
        await usdc.methods
          .approve(BuyCRET._address, price)
          .send({from: userAddress})

        const transaction = await BuyCRET.methods
          .buyToken(price)
          .send({from: userAddress})
        const txHash = transaction.transactionHash
        dispatch({
          type: BUY__CPT__SUCCESS,
          transactionHash: txHash,
        })
        dispatch(getProfileInformation())
        dispatch(getProfileInformationTest())
      } else if (type === 'CCPT') {
        if (ccptTokenType === 'CAPL') {
          await capl.methods
            .approve(BuyCCPT._address, price)
            .send({from: userAddress})
          const transaction = await BuyCCPT.methods
            .buyToken(price, 0)
            .send({from: userAddress})
          const txHash = transaction.transactionHash
          dispatch({
            type: BUY__CPT__SUCCESS,
            transactionHash: txHash,
          })
          dispatch(getProfileInformation())
          dispatch(getProfileInformationTest())
        } else if (ccptTokenType === 'CRET') {
          await cret.methods
            .approve(BuyCCPT._address, price)
            .send({from: userAddress})
          const transaction = await BuyCCPT.methods
            .buyToken(price, 1)
            .send({from: userAddress})
          const txHash = transaction.transactionHash
          dispatch({
            type: BUY__CPT__SUCCESS,
            transactionHash: txHash,
          })
          dispatch(getProfileInformation())
          dispatch(getProfileInformationTest())
        }
      }
    } catch (error) {
      dispatch({
        type: BUY__CPT__FAIL,
        payload: error?.message,
      })
    }
  }

export const clearHashValue = () => async (dispatch) => {
  dispatch({
    type: CLEAR_HASH_VALUE,
  })
}
