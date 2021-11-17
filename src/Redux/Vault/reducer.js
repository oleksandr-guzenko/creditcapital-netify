import {
  CLEAR_VALUES,
  GET_CONVERTED_USDC_CCPT_VALUES_SUCCESS,
  GET_DEPOSITED_BALANCE_SUCCESS,
  GET_VAULT_BALANCE_SUCCESS,
  VAULT_DEPOSIT_FAIL,
  VAULT_DEPOSIT_REQUEST,
  VAULT_DEPOSIT_SUCCESS,
} from './constants'

const initialState = {
  vaultLoading: false,
  vaultError: false,
  vaultHash: '',
  vaultType: '',
  usdc_ccpt_Balance: 0,
  depositedLpBalance: 0,
  vaultLpBalance: 0,
}
export const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPOSITED_BALANCE_SUCCESS:
      return {
        ...state,
        depositedLpBalance: action.payload,
      }
    case GET_CONVERTED_USDC_CCPT_VALUES_SUCCESS:
      return {
        ...state,
        usdc_ccpt_Balance: action.payload,
      }
    case VAULT_DEPOSIT_REQUEST:
      return {
        ...state,
        vaultError: false,
        vaultLoading: true,
        vaultType: action.payload,
      }
    case VAULT_DEPOSIT_SUCCESS:
      return {
        ...state,
        vaultLoading: false,
        vaultError: false,
        vaultHash: action.payload,
      }
    case VAULT_DEPOSIT_FAIL:
      return {
        ...state,
        vaultLoading: false,
        vaultError: action.payload,
      }
    case CLEAR_VALUES:
      return {
        ...state,
        vaultLoading: false,
        vaultError: false,
        vaultHash: '',
        vaultType: '',
      }

    // case VAULT_TRANSFORM_REQUEST:
    //   return {
    //     ...state,
    //     vaultTransformError: false,
    //     vaultTransformLoading: true,
    //     vaultTransformType: action.payload,
    //   }
    // case VAULT_TRANSFORM_SUCCESS:
    //   clearValue()
    //   return {
    //     ...state,
    //     vaultTransformLoading: false,
    //     vaultTransformError: false,
    //     vaultTransformHash: action.payload,
    //     vaultHash: action.payload,
    //   }
    // case VAULT_TRANSFORM_FAIL:
    //   return {
    //     ...state,
    //     vaultTransformLoading: false,
    //     vaultTransformError: action.payload,
    //   }
    default:
      return state
  }
}
