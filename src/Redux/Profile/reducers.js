import {CONNECT_WALLET} from './constants'

const initialState = {
  profileLoading: false,
  userAddress: '',
  walletType: '',
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        userAddress: action.payload,
        walletType: action.walletType,
      }

    default:
      return state
  }
}
