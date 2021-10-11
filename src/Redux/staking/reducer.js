import {
  STAKE_REQUEST,
  STAKE_SUCCESS,
  STAKE_FAIL,
  UN_STAKE_REQUEST,
  UN_STAKE_SUCCESS,
  UN_STAKE_FAIL,
  CLEAR_HISTORY,
  STAKING_INFO_REQUEST,
  STAKING_INFO_SUCCESS,
  STAKING_INFO_FAIL,
} from './constants.js'

const initialState = {
  stakingInfo: {
    loading: false,
    error: false,
    data: [],
  },
  type: '',
  success: '',
  unStakeType: null,
  stakingLoading: false,
  stakingError: false,
  stakingType: '',
  transactionHASH: '',
  transactionStatus: null,
  tokenAmount: '',
  typeOfTransaction: '',
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
    case STAKE_REQUEST:
      return {
        ...state,
        stakingLoading: true,
        stakingError: false,
        tokenAmount: action.payload.tokenAmount,
        typeOfTransaction: action.payload.typeOfTransaction,
        transactionStatus: null,
        stakingType: action.payload.stakingType,
      }
    case STAKE_SUCCESS:
      return {
        ...state,
        stakingLoading: false,
        transactionHASH: action.payload.transactionHASH,
        transactionStatus: action.payload.transactionStatus,
      }
    case STAKE_FAIL:
      return {
        ...state,
        stakingLoading: false,
        stakingError: action.payload,
      }
    case UN_STAKE_REQUEST:
      return {
        ...state,
        stakingLoading: true,
        stakingError: false,
        tokenAmount: action.payload.tokenAmount,
        typeOfTransaction: action.payload.typeOfTransaction,
        transactionStatus: null,
        unStakeType: action.payload.unStakeType,
        stakingType: action.payload.stakingType,
      }
    case UN_STAKE_SUCCESS:
      return {
        ...state,
        stakingLoading: false,
        transactionHASH: action.payload.transactionHASH,
        transactionStatus: action.payload.transactionStatus,
      }
    case UN_STAKE_FAIL:
      return {
        ...state,
        stakingLoading: false,
        stakingError: action.payload,
      }
    // case UN_STAKE_TIMER_REQUEST:
    //   return {
    //     ...state,
    //     coolDownPeriodLoading: true,
    //     coolDownPeriodError: false,
    //   }
    // case UN_STAKE_TIMER_SUCCESS:
    //   return {
    //     ...state,
    //     coolDownPeriod: action.payload,
    //     coolDownPeriodLoading: false,
    //   }
    // case UN_STAKE_TIMER_STATUS:
    //   return {
    //     ...state,
    //     isAvailableForClaim: action.payload,
    //     coolDownPeriodLoading: false,
    //   }
    // case UN_STAKE_TIMER_FAIL:
    //   return {
    //     ...state,
    //     coolDownPeriodError: action.payload,
    //     coolDownPeriodLoading: false,
    //   }
    // case CLAIM_WITHDRAW_REQUEST:
    //   return {
    //     ...state,
    //     claimLoading: true,
    //     claimError: false,
    //   }
    // case CLAIM_WITHDRAW_SUCCESS:
    //   return {
    //     ...state,
    //     claimLoading: false,
    //     claimStatus: action.payload.claimStatus,
    //     claimError: false,
    //   }
    // case CLAIM_WITHDRAW_FAIL:
    //   return {
    //     ...state,
    //     claimLoading: false,
    //     claimError: action.payload,
    //   }

    case STAKING_INFO_REQUEST:
      return {
        ...state,
        type: action.payload,
        success: '',
        stakingInfo: {
          loading: true,
          error: false,
          data: [],
        },
      }
    case STAKING_INFO_SUCCESS:
      return {
        ...state,
        stakingInfo: {
          loading: false,
          error: false,
          data: action.payload,
        },
        success: 200,
      }
    case STAKING_INFO_FAIL:
      return {
        ...state,
        stakingInfo: {
          loading: false,
          error: action.payload,
          data: [],
        },
        success: '',
      }

    default:
      return state
  }
}
