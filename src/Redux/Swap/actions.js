import {gasPrice, priceConversion} from '../../Utilities/Util'
import getContracts from '../Blockchain/contracts'
import {checkAndAddNetwork} from '../Profile/actions'
import {
  GET_CONVERTED_CCPT_VALUES_SUCCESS,
  GET_CONVERTED_USDC_VALUES_SUCCESS,
  GET_SWAP_TOKENS_BALANCE,
  REMOVE_HASH,
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
      const price = priceConversion('toWei', 'Mwei', amount, web3)

      // const newGasPrice = await gasPrice(web3)
      if (tokenType === 'USDC') {
        await USDCBNB.methods
          .approve(swap._address, price)
          .send({from: userAddress})
        const transaction = await swap.methods
          .getCapl(price, minutes * 60)
          .send({from: userAddress})
        const tranHash = transaction.transactionHash
        dispatch({
          type: SWAPPING_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }

      if (tokenType === 'CAPL') {
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
    } catch (error) {
      dispatch({
        type: SWAPPING_FAIL,
        payload: error?.message,
      })
    }
  }

export const addLiquidityTokens =
  (capl, usdc, minutes) => async (dispatch, getState) => {
    try {
      dispatch(checkAndAddNetwork())
      dispatch({
        type: SWAPPING_REQUEST,
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {VAULTLP, USDCBNB, CCPTBNB, web3} = getContracts(walletType)

      const priceCAPL = priceConversion('toWei', 'Mwei', capl, web3)
      const priceUSDC = priceConversion('toWei', 'Mwei', usdc, web3)

      await USDCBNB.methods
        .approve(VAULTLP._address, priceUSDC)
        .send({from: userAddress})

      await CCPTBNB.methods
        .approve(VAULTLP._address, priceCAPL)
        .send({from: userAddress})

      const transaction = await VAULTLP.methods
        .addLiquidityBoth(priceCAPL, priceUSDC, minutes * 60)
        .send({from: userAddress})
      const tranHash = transaction.transactionHash
      dispatch({
        type: SWAPPING_SUCCESS,
        payload: tranHash,
      })
      dispatch(getSwapTokenBalances())
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
      const price = priceConversion('toWei', 'Mwei', amount, web3)


      if (tokenType === 'USDC') {
        const ccptAmount = await swap.methods.getCaplAmount(price).call()
        const ccptPrice = Number(
          priceConversion('fromWei', 'Mwei', ccptAmount, web3)
        )?.toFixed(18)

        dispatch({
          type: GET_CONVERTED_CCPT_VALUES_SUCCESS,
          payload: {ccptPrice},
        })
      }
      if (tokenType === 'CAPL') {
        const usdcAmount = await swap.methods.getUSDCAmount(price).call()
        const usdcPrice = Number(
          priceConversion('fromWei', 'Mwei', usdcAmount, web3)
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
      const usdcBNBBalance = web3.utils.fromWei(usdcbalance.toString(), 'Mwei')
      const ccptbalance = await CCPTBNB.methods.balanceOf(userAddress).call()
      const ccptBNBBalance = web3.utils.fromWei(ccptbalance.toString(), 'Mwei')
      dispatch({
        type: GET_SWAP_TOKENS_BALANCE,
        payload: {usdcBNBBalance, ccptBNBBalance},
      })
    }
  } catch (error) {
    console.log(error?.message)
  }
}

export const REMOVE_hash = () => async (dispatch) => {
  dispatch({
    type: REMOVE_HASH,
  })
}
