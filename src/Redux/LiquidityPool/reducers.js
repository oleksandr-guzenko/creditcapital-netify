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
  caplAmount: '',
  temporaryUSDC: '',
  typeOfTransaction: '',
}

export const liquidityPoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIQUIDITY_DEPOSIT_REQUEST:
    case LIQUIDITY_WITHDRAW_REQUEST:
      return {
        ...state,
        liquidityLoading: true,
        liquidityError: false,
        temporaryUSDC: action.payload.amount,
        typeOfTransaction: action.payload.typeOfTransaction,
      }
    case LIQUIDITY_DEPOSIT_SUCCESS:
    case LIQUIDITY_WITHDRAW_SUCCESS:
      return {
        ...state,
        liquidityLoading: false,
        liquidityError: false,
        transactionHashID: action.payload.transactionHashID,
        caplAmount: action.payload.tokenAmount,
        temporaryUSDC: '',
      }
    case LIQUIDITY_DEPOSIT_FAIL:
    case LIQUIDITY_WITHDRAW_FAIL:
      return {
        ...state,
        liquidityLoading: false,
        liquidityError: action.payload,
      }
    case CLEAR_TRANSACTION_HISTORY:
      return {
        ...state,
        transactionHashID: '',
        liquidityLoading: false,
        liquidityError: false,
      }

    default:
      return state
  }
}
