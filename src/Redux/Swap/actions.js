import {gasLimit, gasPrice, priceConversion} from '../../Utilities/Util'
import {CCPTBnbAddress} from '../Blockchain/ABI/CCPTBNB'
import {USDCBnbAddress} from '../Blockchain/ABI/USDCBNB'
import getContracts from '../Blockchain/contracts'
import {checkAndAddNetwork} from '../Profile/actions'
import {GET_DEPOSITED_BALANCE_SUCCESS} from '../Vault/constants'
import {
  CANCEL_LOADING,
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
        const allowance = await USDCBNB.methods
          .allowance(userAddress, swap._address)
          .call()
        if (allowance < price) {
          await USDCBNB.methods
            .approve(swap._address, price)
            .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        }
        const transaction = await swap.methods
          .getCapl(price, minutes * 60)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        const tranHash = transaction.transactionHash
        dispatch({
          type: SWAPPING_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }

      if (tokenType === 'CAPL') {
        const allowance = await CCPTBNB.methods
          .allowance(userAddress, swap._address)
          .call()
        if (allowance < price) {
          await CCPTBNB.methods
            .approve(swap._address, price)
            .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        }
        const transaction = await swap.methods
          .getUSDC(price, minutes * 60)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
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
      dispatch({
        type: SWAPPING_REQUEST,
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {quickSwapRouter, USDCBNB, CCPTBNB, web3} = getContracts(walletType)

      const allowance = await USDCBNB.methods
        .allowance(userAddress, quickSwapRouter._address)
        .call()

      const CAPLallowance = await CCPTBNB.methods
        .allowance(userAddress, quickSwapRouter._address)
        .call()
      const newGasPrice = await gasPrice(web3)
      const cap = Number(capl) * 10 ** 6
      const usd = Number(usdc) * 10 ** 6

      // const priceCAPL = priceConversion('toWei', 'Mwei', capl, web3)
      // const priceUSDC = priceConversion('toWei', 'Mwei', usdc, web3)

      const priceCAPL = cap
      const priceUSDC = usd

      if (allowance < priceUSDC) {
        await USDCBNB.methods
          .approve(quickSwapRouter._address, priceUSDC)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
      }
      if (CAPLallowance < priceCAPL) {
        await CCPTBNB.methods
          .approve(quickSwapRouter._address, priceCAPL)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
      }

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
        .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
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
      // treasury wallet
      const treasuryWalletAddress = '0x42C48D6212a697825d8648D5101ADC104f81ec51'
      const treasuryusdc = await USDCBNB.methods
        .balanceOf(treasuryWalletAddress)
        .call()
      const treasurycapl = await CCPTBNB.methods
        .balanceOf(treasuryWalletAddress)
        .call()
      const treasuryusdc_capl = await USDC_CCPT_TOKEN.methods
        .balanceOf(treasuryWalletAddress)
        .call()
      const treasuryUSDC = web3.utils.fromWei(treasuryusdc.toString(), 'Mwei')
      const treasuryCAPL = web3.utils.fromWei(treasurycapl.toString(), 'Mwei')
      const treasuryUSDC_CAPL = web3.utils.fromWei(
        treasuryusdc_capl.toString(),
        'ether'
      )

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
      const valutRew = web3.utils.fromWei(vaultRssss.toString(), 'ether')
      const vaultRewards = valutRew * 10000

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
          treasuryUSDC,
          treasuryCAPL,
          treasuryUSDC_CAPL,
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
        // treasury wallet
        const treasuryWalletAddress =
          '0x42C48D6212a697825d8648D5101ADC104f81ec51'
        const treasuryusdc = await USDCBNB.methods
          .balanceOf(treasuryWalletAddress)
          .call()
        const treasurycapl = await CCPTBNB.methods
          .balanceOf(treasuryWalletAddress)
          .call()
        const treasuryusdc_capl = await USDC_CCPT_TOKEN.methods
          .balanceOf(treasuryWalletAddress)
          .call()
        const treasuryUSDC = web3.utils.fromWei(treasuryusdc.toString(), 'Mwei')
        const treasuryCAPL = web3.utils.fromWei(treasurycapl.toString(), 'Mwei')
        const treasuryUSDC_CAPL = web3.utils.fromWei(
          treasuryusdc_capl.toString(),
          'ether'
        )

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
        const valutRew = web3.utils.fromWei(vaultRssss.toString(), 'ether')
        const vaultRewards = valutRew * 10000
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
            treasuryUSDC,
            treasuryCAPL,
            treasuryUSDC_CAPL,
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

export const cancelLoading = () => async (dispatch) => {
  dispatch({
    type: CANCEL_LOADING,
  })
}
