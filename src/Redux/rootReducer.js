import {combineReducers} from 'redux'
import {buyCAPLandCRETReducer} from './BuyCAPTAndCRET/reducer'
import {liquidityPoolReducer} from './LiquidityPool/reducers'
import {profileReducer, profileReducerTest} from './Profile/reducers'
import {defaultReducer} from './Root/reducers'

import {stakingReducer} from './staking/reducer'
import {swapReducer} from './Swap/reducer'
import {vaultReducer} from './Vault/reducer'

const rootReducer = combineReducers({
  root: defaultReducer,
  profile: profileReducer,
  testProfile: profileReducerTest,
  liquidity: liquidityPoolReducer,
  staking: stakingReducer,
  buyTokens: buyCAPLandCRETReducer,
  swap: swapReducer,
  vault: vaultReducer,
})

export default rootReducer
