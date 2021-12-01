import {gasPrice, priceConversion} from '../../Utilities/Util'
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

      const newGasPrice = await gasPrice(web3)
      const {REWARDS_VAULT, USDC_CCPT_TOKEN, USDCBNB, CCPTBNB, web3} =
        getContracts(walletType)

      const price = priceConversion('toWei', 'ether', amount, web3)
      console.log(price)

      // const newGasPrice = await gasPrice(web3)

      if (type === 'deposit') {
        await USDC_CCPT_TOKEN.methods
          .approve(REWARDS_VAULT._address, price)
          .send({from: userAddress, newGasPrice: newGasPrice})

        const transaction = await REWARDS_VAULT.methods
          .deposit(0, price)
          .send({from: userAddress, newGasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'withdraw') {
        const transaction = await REWARDS_VAULT.methods
          .withdraw(0, price)
          .send({from: userAddress, newGasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'rewards') {
        const transaction = await REWARDS_VAULT.methods
          .withdraw(0, 0)
          .send({from: userAddress, newGasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'usdcDeposit') {
        const priceUSDC = priceConversion('toWei', 'Mwei', amount, web3)
        await USDCBNB.methods
          .approve(REWARDS_VAULT._address, priceUSDC)
          .send({from: userAddress, newGasPrice: newGasPrice})
        const transaction = await REWARDS_VAULT.methods
          .depositWithUsdc(0, priceUSDC)
          .send({from: userAddress, newGasPrice: newGasPrice})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      } else if (type === 'caplDeposit') {
        const priceCAPL = priceConversion('toWei', 'Mwei', amount, web3)

        await CCPTBNB.methods
          .approve(REWARDS_VAULT._address, priceCAPL)
          .send({from: userAddress, newGasPrice: newGasPrice})

        const transaction = await REWARDS_VAULT.methods
          .depositWithCapl(0, priceCAPL)
          .send({from: userAddress, newGasPrice: newGasPrice})

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
        await USDCBNB.methods
          .approve(VAULTLP._address, price)
          .send({from: userAddress, newGasPrice: newGasPrice})
        const transaction = await VAULTLP.methods
          .addLiquidityUsdc(price, minutes * 60)
          .send({from: userAddress, newGasPrice: newGasPrice})
        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
      }

      if (tokenType === 'ccptToken') {
        await CCPTBNB.methods
          .approve(VAULTLP._address, price)
          .send({from: userAddress, newGasPrice: newGasPrice})
        const transaction = await VAULTLP.methods
          .addLiquidityCapl(price, minutes * 60)
          .send({from: userAddress, newGasPrice: newGasPrice})
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
      vault: {reserves},
    } = getState()

    if (reserves?._reserve0 && reserves?._reserve1) {
      const {APY_VAULT, web3} = getContracts(walletType)
      const res = await APY_VAULT.methods.sharesTotal().call()
      const mul = Number(res) * 100000000

      const totalLp = Number(priceConversion('fromWei', 'ether', mul, web3))

      const trans =
        (5000 * 12 * 30 * 10 ** 8) / Number(reserves?._reserve0) +
        Number(reserves?._reserve1)

      dispatch({
        type: SHARES_TOTAL,
        payload: {trans, totalLp},
      })
    }
  } catch (error) {
    console.log(error?.message)
  }
}
