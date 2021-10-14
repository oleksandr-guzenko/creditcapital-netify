import {
  BUY__CPT__REQUEST,
  BUY__CPT__FAIL,
  BUY__CPT__SUCCESS,
  CLEAR_HASH_VALUE,
} from './constants'

const cptState = {
  hashID: '',
  loading: false,
  error: false,
  temporaryUSD: '',
  temporaryCPT: '',
  tokenType: '',
  ccptTokenType: '',
}
export const buyCAPLandCRETReducer = (state = cptState, action) => {
  switch (action.type) {
    case BUY__CPT__REQUEST:
      return {
        ...state,
        loading: true,
        tokenType: action.payload.tokenType,
        temporaryUSD: action.payload.amount,
        temporaryCPT: action.payload.CPT,
        ccptTokenType: action.payload.ccptTokenType,
      }

    // case BUY__CRT__REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     temporaryUSD: action.payload.amount,
    //     temporaryCRT: action.payload.CPT,
    //     temporaryCPT: '',
    //   }

    case BUY__CPT__SUCCESS:
      return {
        ...state,
        loading: false,
        hashID: action.transactionHash,
      }
    case CLEAR_HASH_VALUE:
      return {
        ...state,
        hashID: '',
        error: false,
      }
    case BUY__CPT__FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
