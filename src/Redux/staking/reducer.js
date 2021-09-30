import {
  STAKE_CAPL_REQUEST,
  STAKE_CAPL_SUCCESS,
  STAKE_CAPL_FAIL,
  STAKE_CRET_REQUEST,
  STAKE_CRET_SUCCESS,
  STAKE_CRET_FAIL,
  UN_STAKE_CAPL_REQUEST,
  UN_STAKE_CAPL_SUCCESS,
  UN_STAKE_CAPL_FAIL,
  UN_STAKE_CRET_REQUEST,
  UN_STAKE_CRET_SUCCESS,
  UN_STAKE_CRET_FAIL,
  UN_STAKE_TIMER_REQUEST,
  UN_STAKE_TIMER_SUCCESS,
  UN_STAKE_TIMER_FAIL,
  UN_STAKE_TIMER_STATUS,
  CLEAR_HISTORY,
  CLAIM_WITHDRAW_REQUEST,
  CLAIM_WITHDRAW_SUCCESS,
  CLAIM_WITHDRAW_FAIL,
} from './constansts.js'
const initialState = {
  unStakeType: null,
  stakingLoading: false,
  stakingError: false,
  transactionHASH: '',
  transactionStatus: null,
  tokenAmount: '',
  typeOfTransaction: '',
  coolDownPeriodLoading: false,
  coolDownPeriod: [],
  isAvailableForClaim: false,
  coolDownPeriodError: false,
  claimLoading: false,
  claimStatus: '',
  claimError: false,
}
export const stakingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_HISTORY:
      return {
        ...state,
        transactionHASH: '',
        transactionStatus: null,
        stakingError: false,
      }
    case STAKE_CAPL_REQUEST:
      return {
        ...state,
        stakingLoading: true,
        stakingError: false,
        tokenAmount: action.payload.tokenAmount,
        typeOfTransaction: action.payload.typeOfTransaction,
        transactionStatus: null,
      }
    case STAKE_CAPL_SUCCESS:
      return {
        ...state,
        stakingLoading: false,
        transactionHASH: action.payload.transactionHASH,
        transactionStatus: action.payload.transactionStatus,
      }
    case STAKE_CAPL_FAIL:
      return {
        ...state,
        stakingLoading: false,
        stakingError: action.payload,
      }
    case UN_STAKE_CAPL_REQUEST:
      return {
        ...state,
        stakingLoading: true,
        stakingError: false,
        tokenAmount: action.payload.tokenAmount,
        typeOfTransaction: action.payload.typeOfTransaction,
        transactionStatus: null,
        unStakeType: action.payload.unStakeType,
      }
    case UN_STAKE_CAPL_SUCCESS:
      return {
        ...state,
        stakingLoading: false,
        transactionHASH: action.payload.transactionHASH,
        transactionStatus: action.payload.transactionStatus,
      }
    case UN_STAKE_CAPL_FAIL:
      return {
        ...state,
        stakingLoading: false,
        stakingError: action.payload,
      }
    case UN_STAKE_TIMER_REQUEST:
      return {
        ...state,
        coolDownPeriodLoading: true,
        coolDownPeriodError: false,
      }
    case UN_STAKE_TIMER_SUCCESS:
      return {
        ...state,
        coolDownPeriod: action.payload,
        coolDownPeriodLoading: false,
      }
    case UN_STAKE_TIMER_STATUS:
      return {
        ...state,
        isAvailableForClaim: action.payload,
        coolDownPeriodLoading: false,
      }
    case UN_STAKE_TIMER_FAIL:
      return {
        ...state,
        coolDownPeriodError: action.payload,
        coolDownPeriodLoading: false,
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
