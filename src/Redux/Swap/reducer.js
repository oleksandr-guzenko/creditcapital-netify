import { CANCEL_LOADING, GET_CAPL_PRICE, PROFILE_FAIL } from './constans'
import {
  TOKEN,
  GET_CONVERTED_CCPT_VALUES_SUCCESS,
  GET_CONVERTED_USDC_VALUES_SUCCESS,
  GET_SWAP_TOKENS_BALANCE,
  SWAPPING_FAIL,
  SWAPPING_REQUEST,
  REMOVE_HASH,
  SWAPPING_SUCCESS,
  PROFILE_REQ,
  PROFILE_SUCC,
  USDCAPPROVE_SUCCESS,
  APPROVING_FAIL,
} from './constans'

const initialState = {
  token: 'USDC',
  swapLoading: false,
  swapError: false,
  swapHash: '',
  usdcPrice: '',
  ccptPrice: '',
  swapingType: '',
  usdcBNBBalance: 0,
  ccptBNBBalance: 0,
  balanceLoading: false,
  balanceError: false,
  caplPrice: '',
  usdcApprove: false,
  approveLoading: false,
}
export const swapReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.payload.changeToken,
      }
    case GET_CAPL_PRICE:
      return {
        ...state,
        caplPrice: action.payload,
      }
    case PROFILE_REQ:
      return {
        ...state,
        balanceLoading: true,
      }
    case PROFILE_SUCC:
      return {
        ...state,
        balanceLoading: false,
      }
    case PROFILE_FAIL:
      return {
        ...state,
        balanceLoading: false,
      }
    case GET_SWAP_TOKENS_BALANCE:
      return {
        ...state,
        usdcBNBBalance: action.payload.usdcBNBBalance,
        ccptBNBBalance: action.payload.ccptBNBBalance,
      }
    case GET_CONVERTED_CCPT_VALUES_SUCCESS:
      return {
        ...state,
        ccptPrice: action.payload.ccptPrice,
      }
    case GET_CONVERTED_USDC_VALUES_SUCCESS:
      return {
        ...state,
        usdcPrice: action.payload.usdcPrice,
      }
    case SWAPPING_REQUEST:
      return {
        ...state,
        swapError: false,
        swapLoading: true,
        swapingType: action.payload,
      }
    case SWAPPING_SUCCESS:
      return {
        ...state,
        swapLoading: false,
        swapError: false,
        swapHash: action.payload,
      }
    case SWAPPING_FAIL:
      return {
        ...state,
        swapLoading: false,
        swapError: action.payload,
      }
    case REMOVE_HASH:
      return {
        ...state,
        swapLoading: false,
        swapError: false,
        swapHash: '',
        swapingType: '',
      }
    case CANCEL_LOADING:
      return {
        ...state,
        swapLoading: false,
      }
    case USDCAPPROVE_SUCCESS:
      return {
        ...state,
        usdcApprove: true,
      }
    case APPROVING_FAIL:
      return {
        ...state,
        approveLoading: false,
        approveError: action.payload,
      }
    default:
      return state
  }
}
