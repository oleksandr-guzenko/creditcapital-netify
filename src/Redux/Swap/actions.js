import {gasPrice, priceConversion} from '../../Utilities/Util'
import {CCPTBnbAddress} from '../Blockchain/ABI/CCPTBNB'
import {USDCBnbAddress} from '../Blockchain/ABI/USDCBNB'
import getContracts from '../Blockchain/contracts'
import {checkAndAddNetwork} from '../Profile/actions'
import {GET_DEPOSITED_BALANCE_SUCCESS} from '../Vault/constants'
import {
  GET_CAPL_PRICE,
  GET_CONVERTED_CCPT_VALUES_SUCCESS,
  GET_CONVERTED_USDC_VALUES_SUCCESS,
  GET_SWAP_TOKENS_BALANCE,
  PROFILE_FAIL,
  PROFILE_REQ,
  PROFILE_SUCC,
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
      const newGasPrice = await gasPrice(web3)

      if (tokenType === 'USDC') {
        await USDCBNB.methods
          .approve(swap._address, price)
          .send({from: userAddress, gasPrice: newGasPrice})
        const transaction = await swap.methods
          .getCapl(price, minutes * 60)
          .send({from: userAddress, gasPrice: newGasPrice})
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
          .send({from: userAddress, gasPrice: newGasPrice})
        const transaction = await swap.methods
          .getUSDC(price, minutes * 60)
          .send({from: userAddress, gasPrice: newGasPrice})
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

// export const addLiquidityTokens =
//   (capl, usdc, minutes) => async (dispatch, getState) => {
//     try {
//       dispatch(checkAndAddNetwork())
//       dispatch({
//         type: SWAPPING_REQUEST,
//       })
//       const {
//         profile: {walletType, userAddress},
//       } = getState()

//       const {VAULTLP, USDCBNB, CCPTBNB, web3} = getContracts(walletType)
//       const newGasPrice = await gasPrice(web3)

//       const cap = Number(capl) * 10 ** 6
//       const usd = Number(usdc) * 10 ** 6

//       // const priceCAPL = priceConversion('toWei', 'Mwei', capl, web3)
//       // const priceUSDC = priceConversion('toWei', 'Mwei', usdc, web3)

//       const priceCAPL = cap
//       const priceUSDC = usd

//       await USDCBNB.methods
//         .approve(VAULTLP._address, priceUSDC)
//         .send({from: userAddress})

//       await CCPTBNB.methods
//         .approve(VAULTLP._address, priceCAPL)
//         .send({from: userAddress})

//       const transaction = await VAULTLP.methods
//         .addLiquidityBoth(priceCAPL, minutes * 60)
//         .send({from: userAddress, gasPrice: newGasPrice})

//       const tranHash = transaction.transactionHash

//       dispatch({
//         type: SWAPPING_SUCCESS,
//         payload: tranHash,
//       })
//       dispatch(getSwapTokenBalances())
//     } catch (error) {
//       dispatch({
//         type: SWAPPING_FAIL,
//         payload: error?.message,
//       })
//     }
//   }

export const addLiquidityTokens =
  (capl, usdc, minutes) => async (dispatch, getState) => {
    try {
      dispatch(checkAndAddNetwork())
      dispatch({
        type: SWAPPING_REQUEST,
      })
      const {
        profile: {walletType, userAddress, isAdmin},
      } = getState()

      const {quickSwapRouter, USDCBNB, CCPTBNB, web3} = getContracts(walletType)
      const newGasPrice = await gasPrice(web3)

      const cap = Number(capl) * 10 ** 6
      const usd = Number(usdc) * 10 ** 6

      // const priceCAPL = priceConversion('toWei', 'Mwei', capl, web3)
      // const priceUSDC = priceConversion('toWei', 'Mwei', usdc, web3)

      const priceCAPL = cap
      const priceUSDC = usd

      await USDCBNB.methods
        .approve(quickSwapRouter._address, priceUSDC)
        .send({from: userAddress, gasPrice: newGasPrice})

      await CCPTBNB.methods
        .approve(quickSwapRouter._address, priceCAPL)
        .send({from: userAddress, gasPrice: newGasPrice})

      const transaction = await quickSwapRouter.methods
        .addLiquidity(
          USDCBnbAddress,
          CCPTBnbAddress,
          priceUSDC,
          priceCAPL,
          0,
          0,
          userAddress,
          Date.now() + minutes * 60
        )
        .send({from: userAddress, gasPrice: newGasPrice})

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

export const adminLpPool =
  (capl, usdc, minutes) => async (dispatch, getState) => {
    try {
      dispatch(checkAndAddNetwork())
      dispatch({
        type: SWAPPING_REQUEST,
      })
      const {
        profile: {walletType, userAddress, isAdmin},
      } = getState()

      const {quickSwapRouter, USDCBNB, CCPTBNB, web3} = getContracts(walletType)
      const newGasPrice = await gasPrice(web3)

      const cap = Number(capl) * 10 ** 6
      const usd = Number(usdc) * 10 ** 6

      // const priceCAPL = priceConversion('toWei', 'Mwei', capl, web3)
      // const priceUSDC = priceConversion('toWei', 'Mwei', usdc, web3)

      const priceCAPL = cap
      const priceUSDC = usd

      if (isAdmin) {
        await USDCBNB.methods
          .approve(quickSwapRouter._address, priceUSDC)
          .send({from: userAddress, gasPrice: newGasPrice})

        await CCPTBNB.methods
          .approve(quickSwapRouter._address, priceCAPL)
          .send({from: userAddress, gasPrice: newGasPrice})

        const transaction = await quickSwapRouter.methods
          .addLiquidity(
            USDCBnbAddress,
            CCPTBnbAddress,
            priceUSDC,
            priceCAPL,
            0,
            0,
            userAddress,
            Date.now() + minutes * 60
          )
          .send({from: userAddress, gasPrice: newGasPrice})

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
export const caplPriceAction = (amount) => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType},
    } = getState()
    const {swap, web3} = getContracts(walletType)
    const price = priceConversion('toWei', 'Mwei', amount, web3)
    const usdcAmount = await swap.methods.getUSDCAmount(price).call()
    const usdcPrice = Number(
      priceConversion('fromWei', 'Mwei', usdcAmount, web3)
    )?.toFixed(18)
    dispatch({
      type: GET_CAPL_PRICE,
      payload: usdcPrice,
    })
  } catch (error) {
    console.error(error?.message)
  }
}

export const getSwapTokenBalances = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_REQ,
    })
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {USDCBNB, CCPTBNB, web3, REWARDS_VAULT, USDC_CCPT_TOKEN} =
      getContracts(walletType)
    if (userAddress) {
      // available Balance
      const usdcbalance = await USDCBNB.methods.balanceOf(userAddress).call()
      const ccptbalance = await CCPTBNB.methods.balanceOf(userAddress).call()
      const dailyRewards = await REWARDS_VAULT.methods
        .userInfo(0, userAddress)
        .call()

      const deposit = await USDC_CCPT_TOKEN.methods
        .balanceOf(userAddress)
        .call()

      const withDraw = await REWARDS_VAULT.methods
        .userInfo(0, userAddress)
        .call()
      const vaultR = await REWARDS_VAULT.methods
        .pendingCAPL(0, userAddress)
        .call()
      // total Supply
      const totalSup = await USDC_CCPT_TOKEN.methods.totalSupply().call()
      const reserves = await USDC_CCPT_TOKEN.methods.getReserves().call()

      const usdcBNBBalance = web3.utils.fromWei(usdcbalance.toString(), 'Mwei')
      const ccptBNBBalance = web3.utils.fromWei(ccptbalance.toString(), 'Mwei')

      const depositedLpBal = Number(deposit) * 100000000

      const depositedLpBalance = web3.utils.fromWei(
        depositedLpBal.toString(),
        'ether'
      )
      const withdrawLpBal = Number(withDraw?.shares) * 100000000
      const withdrawLpBalance = web3.utils.fromWei(
        withdrawLpBal.toString(),
        'ether'
      )
      const vaultRssss = Number(vaultR) * 100000000
      const vaultRewards = web3.utils.fromWei(vaultRssss.toString(), 'ether')
      // const depositedLpBalance = web3.utils.fromWei(deposit.toString(), 'ether')
      // ##############
      dispatch({
        type: GET_SWAP_TOKENS_BALANCE,
        payload: {usdcBNBBalance, ccptBNBBalance},
      })
      dispatch({
        type: GET_DEPOSITED_BALANCE_SUCCESS,
        payload: {
          depositedLpBalance,
          withdrawLpBalance,
          vaultRewards,
          totalSup,
          reserves,
          dailyRewards,
        },
      })
      dispatch({
        type: PROFILE_SUCC,
      })
    }
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
    })
    console.log(error?.message)
  }
}
export const getSwapTokenBalancesPerSecond =
  () => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {USDCBNB, CCPTBNB, web3, REWARDS_VAULT, USDC_CCPT_TOKEN} =
        getContracts(walletType)
      if (userAddress) {
        // available Balance
        const usdcbalance = await USDCBNB.methods.balanceOf(userAddress).call()
        const ccptbalance = await CCPTBNB.methods.balanceOf(userAddress).call()
        const dailyRewards = await REWARDS_VAULT.methods
          .userInfo(0, userAddress)
          .call()
        const deposit = await USDC_CCPT_TOKEN.methods
          .balanceOf(userAddress)
          .call()
        const withDraw = await REWARDS_VAULT.methods
          .userInfo(0, userAddress)
          .call()
        const vaultR = await REWARDS_VAULT.methods
          .pendingCAPL(0, userAddress)
          .call()
        // total Supply
        const totalSup = await USDC_CCPT_TOKEN.methods.totalSupply().call()
        const reserves = await USDC_CCPT_TOKEN.methods.getReserves().call()

        const usdcBNBBalance = web3.utils.fromWei(
          usdcbalance.toString(),
          'Mwei'
        )
        const ccptBNBBalance = web3.utils.fromWei(
          ccptbalance.toString(),
          'Mwei'
        )
        const depositedLpBal = Number(deposit) * 100000000
        const depositedLpBalance = web3.utils.fromWei(
          depositedLpBal.toString(),
          'ether'
        )
        const withdrawLpBal = Number(withDraw?.shares) * 100000000
        const withdrawLpBalance = web3.utils.fromWei(
          withdrawLpBal.toString(),
          'ether'
        )
        const vaultRssss = Number(vaultR) * 100000000
        const vaultRewards = web3.utils.fromWei(vaultRssss.toString(), 'ether')
        // const depositedLpBalance = web3.utils.fromWei(deposit.toString(), 'ether')
        // ##############
        dispatch({
          type: GET_SWAP_TOKENS_BALANCE,
          payload: {usdcBNBBalance, ccptBNBBalance},
        })
        dispatch({
          type: GET_DEPOSITED_BALANCE_SUCCESS,
          payload: {
            depositedLpBalance,
            withdrawLpBalance,
            vaultRewards,
            totalSup,
            reserves,
            dailyRewards,
          },
        })
        dispatch({
          type: PROFILE_SUCC,
        })
      }
    } catch (error) {
      dispatch({
        type: PROFILE_FAIL,
      })
      console.log(error?.message)
    }
  }

export const REMOVE_hash = () => async (dispatch) => {
  dispatch({
    type: REMOVE_HASH,
  })
}
