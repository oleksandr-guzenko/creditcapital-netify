import {
  CONNECT_WALLET,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from './constants'

const initialState = {
  profileLoading: false,
  userAddress: '',
  walletType: '',
  availableBalance: null,
  profileError: '',
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        userAddress: action.payload,
        walletType: action.walletType,
      }
    case PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true,
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        availableBalance: action.payload.availableBalance,
      }
    case PROFILE_FAIL:
      return {
        ...state,
        profileLoading: false,
        profileError: action.payload,
      }

    default:
      return state
  }
}
