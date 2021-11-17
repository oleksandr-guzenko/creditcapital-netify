import {
  GET_CONVERTED_CCPT_VALUES_SUCCESS,
  GET_CONVERTED_USDC_VALUES_SUCCESS,
  GET_SWAP_TOKENS_BALANCE,
  SWAPPING_FAIL,
  SWAPPING_REQUEST,
  REMOVE_HASH,
  SWAPPING_SUCCESS,
} from './constans'

const initialState = {
  swapLoading: false,
  swapError: false,
  swapHash: '',
  usdcPrice: '',
  ccptPrice: '',
  swapingType: '',
  usdcBNBBalance: 0,
  ccptBNBBalance: 0,
}
export const swapReducer = (state = initialState, action) => {
  switch (action.type) {
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
        usdcPrice: '',
        ccptPrice: '',
        swapingType: '',
        usdcBNBBalance: 0,
        ccptBNBBalance: 0,
      }

    default:
      return state
  }
}
