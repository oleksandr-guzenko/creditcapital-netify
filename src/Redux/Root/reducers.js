import {
  TREASURY_WALLET_REQUEST,
  TREASURY_WALLET_SUCCESS,
  TREASURY_WALLET_FAIL,
} from './constants'

const initialState = {
  loading: false,
  DummyUsdc: '',
  error: false,
  USDCAmount: '',
  tranHash: '',
}

export const defaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case TREASURY_WALLET_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
        DummyUsdc: action.payload,
      }
    case TREASURY_WALLET_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        DummyUsdc: '',
        USDCAmount: action.payload.usdcAmount,
        tranHash: action.payload.tranHash,
      }
    case TREASURY_WALLET_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        DummyUsdc: '',
      }

    default:
      return state
  }
}
