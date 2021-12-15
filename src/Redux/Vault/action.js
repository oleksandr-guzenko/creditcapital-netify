import {gasLimit, gasPrice, priceConversion} from '../../Utilities/Util'
import {CCPTBnbAddress} from '../Blockchain/ABI/CCPTBNB'
import {USDCBnbAddress} from '../Blockchain/ABI/USDCBNB'
import getContracts from '../Blockchain/contracts'
import {checkAndAddNetwork} from '../Profile/actions'
import {getSwapTokenBalances} from '../Swap/actions'
import {
  GET_CONVERTED_USDC_CCPT_VALUES_SUCCESS,
  GET_DEPOSITED_BALANCE_SUCCESS,
  GET_VAULT_BALANCE_SUCCESS,
  VAULT_DEPOSIT_FAIL,
  VAULT_DEPOSIT_REQUEST,
  CLEAR_VALUES,
  VAULT_DEPOSIT_SUCCESS,
  SHARES_TOTAL,
} from './constants'

export const vaultDepositAndWithdrawTokens =
  (amount, type) => async (dispatch, getState) => {
    try {
      dispatch(checkAndAddNetwork())
      dispatch({
        type: VAULT_DEPOSIT_REQUEST,
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {REWARDS_VAULT, USDC_CCPT_TOKEN, USDCBNB, CCPTBNB, web3} =
        getContracts(walletType)
      const newGasPrice = await gasPrice(web3)

      if (type === 'deposit') {
        const newAmount = parseFloat(amount) / 100000000
        const price = (newAmount * 10 ** 18)?.toFixed(0)
        const allowance = await USDC_CCPT_TOKEN.methods
          .allowance(userAddress, REWARDS_VAULT._address)
          .call()
        if (allowance < price) {
          await USDC_CCPT_TOKEN.methods
            .approve(REWARDS_VAULT._address, price)
            .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        }
        const transaction = await REWARDS_VAULT.methods
          .deposit(0, price)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'withdraw') {
        const newAmount = parseFloat(amount) / 100000000
        const price = (newAmount * 10 ** 18)?.toFixed(0)
        const transaction = await REWARDS_VAULT.methods
          .withdraw(0, price)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'rewards') {
        const transaction = await REWARDS_VAULT.methods
          .withdraw(0, 0)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'usdcDeposit') {
        const priceUSDC = priceConversion('toWei', 'Mwei', amount, web3)
        const allowance = await USDCBNB.methods
          .allowance(userAddress, REWARDS_VAULT._address)
          .call()
        console.log(allowance)
        if (allowance < priceUSDC) {
          await USDCBNB.methods
            .approve(REWARDS_VAULT._address, priceUSDC)
            .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        }
        const transaction = await REWARDS_VAULT.methods
          .depositWithUsdc(0, priceUSDC)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'caplDeposit') {
        const priceCAPL = priceConversion('toWei', 'Mwei', amount, web3)

        const allowance = await CCPTBNB.methods
          .allowance(userAddress, REWARDS_VAULT._address)
          .call()

        if (allowance < priceCAPL) {
          await CCPTBNB.methods
            .approve(REWARDS_VAULT._address, priceCAPL)
            .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        }
        const transaction = await REWARDS_VAULT.methods
          .depositWithCapl(0, priceCAPL)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }
      // dispatch(getUSDCAndCCPTBalance())
    } catch (error) {
      dispatch({
        type: VAULT_DEPOSIT_FAIL,
        payload: error?.message,
      })
    }
  }

export const transformTokens =
  (amount, tokenType, minutes) => async (dispatch, getState) => {
    try {
      dispatch(checkAndAddNetwork())
      dispatch({
        type: VAULT_DEPOSIT_REQUEST,
        payload: tokenType,
      })
      const {
        profile: {walletType, userAddress},
      } = getState()

      const {VAULTLP, USDCBNB, CCPTBNB, web3} = getContracts(walletType)
      const price = priceConversion('toWei', 'Mwei', amount, web3)
      const newGasPrice = await gasPrice(web3)

      if (tokenType === 'usdcToken') {
        const allowance = await USDCBNB.methods
          .allowance(userAddress, VAULTLP._address)
          .call()
        if (allowance < price) {
          await USDCBNB.methods
            .approve(VAULTLP._address, price)
            .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        }
        const transaction = await VAULTLP.methods
          .addLiquidityUsdc(price, minutes * 60)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }

      if (tokenType === 'ccptToken') {
        const allowance = await CCPTBNB.methods
          .allowance(userAddress, VAULTLP._address)
          .call()
        if (allowance < price) {
          await CCPTBNB.methods
            .approve(VAULTLP._address, price)
            .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        }
        const transaction = await VAULTLP.methods
          .addLiquidityCapl(price, minutes * 60)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }
    } catch (error) {
      dispatch({
        type: VAULT_DEPOSIT_FAIL,
        payload: error?.message,
      })
    }
  }

export const removeLpAction =
  (amount, minutes) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VAULT_DEPOSIT_REQUEST,
      })
      const {
        profile: {walletType, userAddress},
      } = getState()
      const {USDC_CCPT_TOKEN, web3, quickSwapRouter} = getContracts(walletType)
      const newAmount = parseFloat(amount) / 100000000
      const newGasPrice = await gasPrice(web3)
      const price = (newAmount * 10 ** 18)?.toFixed(0)
      const allowance = await USDC_CCPT_TOKEN.methods
        .allowance(userAddress, quickSwapRouter._address)
        .call()
      if (allowance < price) {
        await USDC_CCPT_TOKEN.methods
          .approve(quickSwapRouter._address, price)
          .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})
      }

      const transaction = await quickSwapRouter.methods
        .removeLiquidity(
          USDCBnbAddress,
          CCPTBnbAddress,
          price,
          0,
          0,
          userAddress,
          Date.now() + minutes * 60
        )
        .send({from: userAddress, gas: gasLimit, gasPrice: newGasPrice})

      const tranHash = transaction.transactionHash
      dispatch({
        type: VAULT_DEPOSIT_SUCCESS,
        payload: tranHash,
      })
      dispatch(getSwapTokenBalances())
    } catch (error) {
      dispatch({
        type: VAULT_DEPOSIT_FAIL,
        payload: error?.message,
      })
    }
  }

// export const getSwapTokenBalances = () => async (dispatch, getState) => {
//   try {
//     const {
//       profile: {walletType, userAddress},
//     } = getState()

//     const {REWARDS_VAULT, USDC_CCPT_TOKEN, web3} = getContracts(walletType)

//     if (userAddress) {
//       const deposit = await USDC_CCPT_TOKEN.methods
//         .balanceOf(userAddress)
//         .call()
//       const depositedLpBalance = web3.utils.fromWei(deposit.toString(), 'ether')
//       const withDraw = await REWARDS_VAULT.methods
//         .userInfo(0, userAddress)
//         .call()
//       const withdrawLpBalance = web3.utils.fromWei(
//         withDraw?.shares.toString(),
//         'ether'
//       )
//       const vaultR = await REWARDS_VAULT.methods
//         .pendingCAPL(0, userAddress)
//         .call()
//       const vaultRewards = web3.utils.fromWei(vaultR.toString(), 'ether')

//       // total Supply
//       const totalSup = await USDC_CCPT_TOKEN.methods.totalSupply().call()
//       const reserves = await USDC_CCPT_TOKEN.methods.getReserves().call()
//       // const depositedLpBalance = web3.utils.fromWei(deposit.toString(), 'ether')

//       dispatch({
//         type: GET_DEPOSITED_BALANCE_SUCCESS,
//         payload: {
//           depositedLpBalance,
//           withdrawLpBalance,
//           vaultRewards,
//           totalSup,
//           reserves,
//         },
//       })
//     }
//   } catch (error) {
//     console.error(error?.message)
//   }
// }

export const clearHashValues = () => async (dispatch) => {
  dispatch({
    type: CLEAR_VALUES,
  })
}

export const sharesTotal = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
      vault: {reserves, dailyRewards, totalSup},
      swap: {caplPrice},
    } = getState()

    if (reserves?._reserve0 && reserves?._reserve1) {
      const {APY_VAULT, web3} = getContracts(walletType)
      const res = await APY_VAULT.methods.sharesTotal().call()
      const mul = Number(res) * 100000000
      const totalLp = Number(priceConversion('fromWei', 'ether', mul, web3))

      const trans =
        (5000 * 12 * 30 * 10 ** 8) / Number(reserves?._reserve0) +
        Number(reserves?._reserve1)

      const totalShares = (dailyRewards?.shares / res) * 5000

      // const LpTokenPrice =
      //   (reserves?._reserve0 + reserves?._reserve1 * caplPrice) / totalSup
      // 10 ** 12

      const LpTokenPrice =
        (reserves?._reserve0 / 10 ** 6 +
          (reserves?._reserve1 / 10 ** 6) * caplPrice) /
        (totalSup / 10 ** 18)

      dispatch({
        type: SHARES_TOTAL,
        payload: {trans, totalLp, totalShares, LpTokenPrice},
      })
    }
  } catch (error) {
    console.log(error?.message)
  }
}
