import {
  CONNECT_WALLET,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  TEST_PROFILE_FAIL,
  TEST_PROFILE_SUCCESS,
  TEST_PROFILE_REQ,
} from './constants'

const initialState = {
  profileLoading: false,
  profileError: false,
  userAddress: '',
  walletType: '',
  availableBalance: null,
  CAPLBalance: 0,
  CRETBalance: 0,
  CCPTBalance: 0,
  caplRewards: 0,
  cretRewards: 0,
  totalRewards: 0,
  totalPlatformRewards: 0,
  CAPL_CCPTBalance: 0,
  CRET_CCPTBalance: 0,
  lpCAPLBalance: 0,
  lpCRETBalance: 0,
}

const testState = {
  testProfileLoading: false,
  CAPL_CCPTBalance: 0,
  CRET_CCPTBalance: 0,
  testProfileError: false,
  testUSDC: 0,
  lpCAPLBalance: 0,
  lpCRETBalance: 0,
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
        profileError: false,
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        availableBalance: action.payload.availableBalance,
        CAPLBalance: action.payload.CAPLBalance,
        CRETBalance: action.payload.CRETBalance,
        CAPL_CCPTBalance: action.payload.CAPL_CCPTBalance,
        CRET_CCPTBalance: action.payload.CRET_CCPTBalance,
        CCPTBalance: action.payload.CCPTBalance,
        totalRewards: action.payload.totalRewards,
        caplRewards: action.payload.caplRewards,
        cretRewards: action.payload.cretRewards,
        totalPlatformRewards: action.payload.totalPlatformRewards,
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

export const profileReducerTest = (state = testState, action) => {
  switch (action.type) {
    case TEST_PROFILE_REQ:
      return {
        ...state,
        testProfileLoading: true,
        testProfileError: false,
      }

    case TEST_PROFILE_SUCCESS:
      return {
        ...state,
        testProfileLoading: false,
        testUSDC: action.payload.testUSDC,
        lpCAPLBalance: action.payload.lpCAPLBalance,
        lpCRETBalance: action.payload.lpCRETBalance,
      }
    case TEST_PROFILE_FAIL:
      return {
        ...state,
        testProfileLoading: false,
        testProfileError: action.payload,
      }

    default:
      return state
  }
}
