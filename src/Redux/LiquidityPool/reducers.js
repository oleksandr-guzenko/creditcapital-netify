import {
  LIQUIDITY_DEPOSIT_REQUEST,
  LIQUIDITY_DEPOSIT_SUCCESS,
  LIQUIDITY_DEPOSIT_FAIL,
  LIQUIDITY_WITHDRAW_REQUEST,
  LIQUIDITY_WITHDRAW_SUCCESS,
  LIQUIDITY_WITHDRAW_FAIL,
  CLEAR_TRANSACTION_HISTORY,
  CLAIM_WITHDRAW_REQUEST,
  CLAIM_WITHDRAW_SUCCESS,
  CLAIM_WITHDRAW_FAIL,
  COOL_DOWN_PERIOD_REQUEST,
  COOL_DOWN_PERIOD_STATUS,
  COOL_DOWN_PERIOD_FAIL,
  COOL_DOWN_PERIOD_SUCCESS,
} from './constants'

const initialState = {
  liquidityLoading: false,
  liquidityError: false,
  transactionHashID: '',
  tokenType: '',
  typeOfLiquidity: '',
  caplAmount: '',
  temporaryTokenAmount: '',
  typeOfTransaction: '',
  coolDownPeriodLoading: false,
  coolDownPeriod: [],
  isAvailableForClaim: false,
  coolDownPeriodError: false,
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
        temporaryTokenAmount: action.payload.amount,
        typeOfTransaction: action.payload.typeOfTransaction,
        tokenType: action.payload.tokenType,
        typeOfLiquidity: action.payload.typeOfLiquidity,
      }
    case LIQUIDITY_DEPOSIT_SUCCESS:
    case LIQUIDITY_WITHDRAW_SUCCESS:
      return {
        ...state,
        liquidityLoading: false,
        liquidityError: false,
        transactionHashID: action.payload.transactionHashID,
        caplAmount: action.payload.tokenAmount,
      }
    case LIQUIDITY_DEPOSIT_FAIL:
    case LIQUIDITY_WITHDRAW_FAIL:
      return {
        ...state,
        liquidityLoading: false,
        liquidityError: action.payload,
      }
    case COOL_DOWN_PERIOD_REQUEST:
      return {
        ...state,
        coolDownPeriodLoading: true,
        coolDownPeriodError: false,
      }
    case COOL_DOWN_PERIOD_SUCCESS:
      return {
        ...state,
        coolDownPeriod: action.payload,
        coolDownPeriodLoading: false,
      }
    case COOL_DOWN_PERIOD_STATUS:
      return {
        ...state,
        isAvailableForClaim: action.payload,
        coolDownPeriodLoading: false,
      }
    case COOL_DOWN_PERIOD_FAIL:
      return {
        ...state,
        coolDownPeriodError: action.payload,
        coolDownPeriodLoading: false,
      }
    case CLEAR_TRANSACTION_HISTORY:
      return {
        ...state,
        transactionHashID: '',
        liquidityError: false,
      }
    case CLAIM_WITHDRAW_REQUEST:
      return {
        ...state,
        liquidityLoading: true,
        claimLoading: true,
        claimError: false,
        temporaryTokenAmount: action.payload.temporaryTokenAmount,
        tokenType: action.payload.tokenType,
        typeOfTransaction: action.payload.typeOfTransaction,
      }
    case CLAIM_WITHDRAW_SUCCESS:
      return {
        ...state,
        claimLoading: false,
        liquidityLoading: false,
        claimStatus: action.payload.claimStatus,
        claimError: false,
        transactionHashID: action.payload.transactionHashID,
        caplAmount: action.payload.tokenAmount,
      }
    case CLAIM_WITHDRAW_FAIL:
      return {
        ...state,
        claimLoading: false,
        liquidityLoading: false,
        claimError: action.payload,
      }

    default:
      return state
  }
}
