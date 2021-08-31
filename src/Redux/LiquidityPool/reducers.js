import {
  LIQUIDITY_DEPOSIT_REQUEST,
  LIQUIDITY_DEPOSIT_SUCCESS,
  LIQUIDITY_DEPOSIT_FAIL,
  CLEAR_TRANSACTION_HISTORY,
  LIQUIDITY_WITHDRAW_REQUEST,
  LIQUIDITY_WITHDRAW_SUCCESS,
  LIQUIDITY_WITHDRAW_FAIL,
} from './constants'

const initialState = {
  liquidityLoading: false,
  liquidityError: false,
  transactionHashID: '',
  tokenAmount: '',
  usdcAmount: '',
  tokenType: '',
  temporaryUSDC: '',
}

export const liquidityPoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIQUIDITY_DEPOSIT_REQUEST:
    case LIQUIDITY_WITHDRAW_REQUEST:
      return {
        ...state,
        liquidityLoading: true,
        liquidityError: false,
        temporaryUSDC: action.payload,
      }
    case LIQUIDITY_DEPOSIT_SUCCESS:
    case LIQUIDITY_WITHDRAW_SUCCESS:
      return {
        ...state,
        liquidityLoading: false,
        liquidityError: false,
        transactionHashID: action.payload.transactionHashID,
        tokenAmount: action.payload.tokenAmount,
        usdcAmount: action.payload.usdcAmount,
        tokenType: action.payload.tokenType,
        temporaryUSDC: '',
      }
    case LIQUIDITY_DEPOSIT_FAIL:
    case LIQUIDITY_WITHDRAW_FAIL:
      return {
        ...state,
        liquidityLoading: false,
        liquidityError: action.payload,
        temporaryUSDC: '',
      }
    case CLEAR_TRANSACTION_HISTORY:
      return {
        ...state,
        transactionHashID: '',
        liquidityLoading: false,
      }

    default:
      return state
  }
}
