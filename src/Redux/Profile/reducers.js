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
  userAddress: '',
  walletType: '',
  availableBalance: null,
  profileError: '',
  totalRewardsEarned: 0,
  cptBalance: 0,
  crtBalance: 0,
  cptLPBalance: 0,
  crtLPBalance: 0,
  unStakeBalance: 0,
}

const testState = {
  testProfileLoading: false,
  CAPLBalance: 0,
  CCPTBalance: 0,
  totalRewards: 0,
  totalPlatformRewards: 0,
  caplRewards: 0,
  cretRewards: 0,
  testProfileError: false,
  testUSDC: 0,
  lpCAPLBalance: 0,
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
        totalRewardsEarned: action.payload.totalRewardsEarned,
        cptBalance: action.payload.cptBalance,
        crtBalance: action.payload.crtBalance,
        cptLPBalance: action.payload.cptLPBalance,
        crtLPBalance: action.payload.crtLPBalance,
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
        CAPLBalance: action.payload.CAPLBalance,
        CCPTBalance: action.payload.CCPTBalance,
        totalRewards: action.payload.totalRewards,
        caplRewards: action.payload.caplRewards,
        cretRewards: action.payload.cretRewards,
        totalPlatformRewards: action.payload.totalPlatformRewards,
        testUSDC: action.payload.testUSDC,
        lpCAPLBalance: action.payload.lpCAPLBalance,
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
