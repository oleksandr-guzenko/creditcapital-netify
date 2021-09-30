import {combineReducers} from 'redux'
import {liquidityPoolReducer} from './LiquidityPool/reducers'
import {profileReducer, profileReducerTest} from './Profile/reducers'
import {defaultReducer} from './Root/reducers'

import {stakingReducer} from './staking/reducer'

const rootReducer = combineReducers({
  root: defaultReducer,
  profile: profileReducer,
  testProfile: profileReducerTest,
  liquidity: liquidityPoolReducer,
  staking: stakingReducer,
})

export default rootReducer
