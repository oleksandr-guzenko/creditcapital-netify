import {combineReducers} from 'redux'
import {profileReducer} from './Profile/reducers'

import {swapReducer} from './Swap/reducer'
import {vaultReducer} from './Vault/reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  swap: swapReducer,
  vault: vaultReducer,
})

export default rootReducer
