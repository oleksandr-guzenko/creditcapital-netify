import {priceConversion} from '../../Utilities/Util'
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
} from './constants'

export const vaultDepositAndWithdrawTokens =
  (amount, type) => async (dispatch, getState) => {
    try {
      dispatch(checkAndAddNetwork())
      dispatch({
        type: VAULT_DEPOSIT_REQUEST,
      })
      console.log('sdcdsf')

      const {
        profile: {walletType, userAddress},
      } = getState()

      const {REWARDS_VAULT, USDC_CCPT_TOKEN, web3} = getContracts(walletType)

      const price = priceConversion('toWei', 'ether', amount, web3)
      // const newGasPrice = await gasPrice(web3)

      if (type === 'deposit') {
        await USDC_CCPT_TOKEN.methods
          .approve(REWARDS_VAULT._address, price)
          .send({from: userAddress})

        const transaction = await REWARDS_VAULT.methods
          .deposit(0, price)
          .send({from: userAddress})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getDepositedBalance())
      } else if (type === 'withdraw') {
        const transaction = await REWARDS_VAULT.methods
          .withdraw(0, price)
          .send({from: userAddress})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getDepositedBalance())
      } else if (type === 'rewards') {
        const transaction = await REWARDS_VAULT.methods
          .withdraw(0, 0)
          .send({from: userAddress})

        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getDepositedBalance())
      }

      // dispatch(getUSDCAndCCPTBalance())
    } catch (error) {
      dispatch({
        type: VAULT_DEPOSIT_FAIL,
        payload: error?.message,
      })
    }
  }

export const getUSDCAndCCPTBalance =
  (amount, tokenType) => async (dispatch, getState) => {
    try {
      const {
        profile: {walletType},
      } = getState()

      const {swap, web3} = getContracts(walletType)
      const price = priceConversion('toWei', 'ether', amount, web3)

      if (tokenType === 'usdcTokenType') {
        const ccptAmount = await swap.methods.getCcptAmount(price).call()
        const usdc_ccpt_Balance = Number(
          priceConversion('fromWei', 'ether', ccptAmount, web3)
        )?.toFixed(18)

        dispatch({
          type: GET_CONVERTED_USDC_CCPT_VALUES_SUCCESS,
          payload: usdc_ccpt_Balance,
        })
      }
      if (tokenType === 'ccptTokenType') {
        const usdcAmount = await swap.methods.getUSDCAmount(price).call()
        const usdc_ccpt_Balance = Number(
          priceConversion('fromWei', 'ether', usdcAmount, web3)
        )?.toFixed(18)
        dispatch({
          type: GET_CONVERTED_USDC_CCPT_VALUES_SUCCESS,
          payload: usdc_ccpt_Balance,
        })
      }
    } catch (error) {
      console.error(error?.message)
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
      const price = priceConversion('toWei', 'ether', amount, web3)

      // const newGasPrice = await gasPrice(web3)

      if (tokenType === 'usdcToken') {
        await USDCBNB.methods
          .approve(VAULTLP._address, price)
          .send({from: userAddress})
        const transaction = await VAULTLP.methods
          .addLiquidityUsdc(price, minutes * 60)
          .send({from: userAddress})
        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
        dispatch(getDepositedBalance())
      }

      if (tokenType === 'ccptToken') {
        await CCPTBNB.methods
          .approve(VAULTLP._address, price)
          .send({from: userAddress})
        const transaction = await VAULTLP.methods
          .addLiquidityCcpt(price, minutes * 60)
          .send({from: userAddress})
        const tranHash = transaction.transactionHash
        dispatch({
          type: VAULT_DEPOSIT_SUCCESS,
          payload: tranHash,
        })
        dispatch(getSwapTokenBalances())
        dispatch(getDepositedBalance())
      }
    } catch (error) {
      dispatch({
        type: VAULT_DEPOSIT_FAIL,
        payload: error?.message,
      })
    }
  }
export const getDepositedBalance = () => async (dispatch, getState) => {
  try {
    const {
      profile: {walletType, userAddress},
    } = getState()

    const {REWARDS_VAULT, USDC_CCPT_TOKEN, web3} = getContracts(walletType)

    if (userAddress) {
      const deposit = await USDC_CCPT_TOKEN.methods
        .balanceOf(userAddress)
        .call()
      const depositedLpBalance = web3.utils.fromWei(deposit.toString(), 'ether')
      const withDraw = await REWARDS_VAULT.methods
        .userInfo(0, userAddress)
        .call()
      const withdrawLpBalance = web3.utils.fromWei(
        withDraw?.shares.toString(),
        'ether'
      )
      const vaultR = await REWARDS_VAULT.methods
        .pendingCAPL(0, userAddress)
        .call()
      const vaultRewards = web3.utils.fromWei(vaultR.toString(), 'ether')

      dispatch({
        type: GET_DEPOSITED_BALANCE_SUCCESS,
        payload: {depositedLpBalance, withdrawLpBalance, vaultRewards},
      })
    }
  } catch (error) {
    console.error(error?.message)
  }
}

export const clearHashValues = () => async (dispatch) => {
  dispatch({
    type: CLEAR_VALUES,
  })
}
