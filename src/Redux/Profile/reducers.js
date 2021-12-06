import {CHECK_ADMIN, CONNECT_WALLET} from './constants'

const initialState = {
  profileLoading: false,
  profileError: false,
  userAddress: '',
  walletType: '',
  isAdmin: false,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        userAddress: action.payload,
        walletType: action.walletType,
      }
    case CHECK_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      }
    default:
      return state
  }
}
