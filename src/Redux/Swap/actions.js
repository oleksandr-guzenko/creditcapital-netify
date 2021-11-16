import {gasPrice, priceConversion} from '../../Utilities/Util'
import getContracts from '../Blockchain/contracts'
import {checkAndAddNetwork} from '../Profile/actions'
import {
  GET_CONVERTED_CCPT_VALUES_SUCCESS,
  GET_CONVERTED_USDC_VALUES_SUCCESS,
  GET_SWAP_TOKENS_BALANCE,
  SWAPPING_FAIL,
  SWAPPING_REQUEST,
  SWAPPING_SUCCESS,
} from './constans'

export const swapTokens =
  (amount, tokenType, minutes) => async (dispatch, getState) => {
    try {
      dispatch(checkAndAddNetwork())
      dispatch({
        type: SWAPPING_REQUEST,
        payload: tokenType,
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {swap, USDCBNB, CCPTBNB, web3} = getContracts(walletType)
      const price = priceConversion('toWei', 'ether', amount, web3)

      // const newGasPrice = await gasPrice(web3)

      if (tokenType === 'USDC') {
        await USDCBNB.methods
          .approve(swap._address, price)
          .send({from: userAddress})
        const transaction = await swap.methods
          .getCcpt(price, minutes * 60)
          .send({from: userAddress})
        const tranHash = transaction.transactionHash
        dispatch({
          type: SWAPPING_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }

      if (tokenType === 'CCPT') {
        await CCPTBNB.methods
          .approve(swap._address, price)
          .send({from: userAddress})
        const transaction = await swap.methods
          .getUSDC(price, minutes * 60)
          .send({from: userAddress})
        const tranHash = transaction.transactionHash
        dispatch({
          type: SWAPPING_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }
      // dispatch(getProfileInformation())
      // dispatch(getProfileInformationTest())
      // dispatch(stakedInformation(stakingType))
    } catch (error) {
      dispatch({
        type: SWAPPING_FAIL,
        payload: error?.message,
      })
    }
  }

export const convertTokenValue =
  (amount, tokenType) => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType},
      } = getState()

      const {swap, web3} = getContracts(walletType)
      const price = priceConversion('toWei', 'ether', amount, web3)

      if (tokenType === 'USDC') {
        const ccptAmount = await swap.methods.getCcptAmount(price).call()
        const ccptPrice = Number(
          priceConversion('fromWei', 'ether', ccptAmount, web3)
        )?.toFixed(18)

        dispatch({
          type: GET_CONVERTED_CCPT_VALUES_SUCCESS,
          payload: {ccptPrice},
        })
      }
      if (tokenType === 'CCPT') {
        const usdcAmount = await swap.methods.getUSDCAmount(price).call()
        const usdcPrice = Number(
          priceConversion('fromWei', 'ether', usdcAmount, web3)
        )?.toFixed(18)
        dispatch({
          type: GET_CONVERTED_USDC_VALUES_SUCCESS,
          payload: {usdcPrice},
        })
      }
    } catch (error) {
      console.error(error?.message)
    }
  }

export const getSwapTokenBalances = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {USDCBNB, CCPTBNB, web3} = getContracts(walletType)

    if (userAddress) {
      // available Balance
      const usdcbalance = await USDCBNB.methods.balanceOf(userAddress).call()
      const usdcBNBBalance = web3.utils.fromWei(usdcbalance.toString(), 'ether')
      const ccptbalance = await CCPTBNB.methods.balanceOf(userAddress).call()
      const ccptBNBBalance = web3.utils.fromWei(ccptbalance.toString(), 'ether')
      dispatch({
        type: GET_SWAP_TOKENS_BALANCE,
        payload: {usdcBNBBalance, ccptBNBBalance},
      })
    }
  } catch (error) {
    console.log(error?.message);
  }
}
