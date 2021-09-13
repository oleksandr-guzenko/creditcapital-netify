import {
  LIQUIDITY_DEPOSIT_REQUEST,
  LIQUIDITY_DEPOSIT_SUCCESS,
  LIQUIDITY_DEPOSIT_FAIL,
  CLEAR_TRANSACTION_HISTORY,
  LIQUIDITY_WITHDRAW_REQUEST,
  LIQUIDITY_WITHDRAW_SUCCESS,
  LIQUIDITY_WITHDRAW_FAIL,
  COOL_DOWN_PERIOD,
  CLAIM_WITHDRAW_REQUEST,
  CLAIM_WITHDRAW_SUCCESS,
  CLAIM_WITHDRAW_FAIL,
} from './constants'

const initialState = {
  liquidityLoading: false,
  liquidityError: false,
  transactionHashID: '',
  caplAmount: '',
  temporaryUSDC: '',
  typeOfTransaction: '',
  coolDownPeriod: [],
  claimLoading: false,
  claimStatus: '',
  claimError: false,
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
    case COOL_DOWN_PERIOD:
      return {
        ...state,
        coolDownPeriod: action.payload,
      }
    case CLEAR_TRANSACTION_HISTORY:
      return {
        ...state,
        transactionHashID: '',
        liquidityLoading: false,
        liquidityError: false,
      }
    case CLAIM_WITHDRAW_REQUEST:
      return {
        ...state,
        claimLoading: true,
        claimError: false,
      }
    case CLAIM_WITHDRAW_SUCCESS:
      return {
        ...state,
        claimLoading: false,
        claimStatus: action.payload,
        claimError: false,
      }
    case CLAIM_WITHDRAW_FAIL:
      return {
        ...state,
        claimLoading: false,
        claimError: action.payload,
      }

    default:
      return state
  }
}
