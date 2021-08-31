import {combineReducers} from 'redux'
import {liquidityPoolReducer} from './LiquidityPool/reducers'
import {profileReducer} from './Profile/reducers'
import {defaultReducer} from './Root/reducers'

const rootReducer = combineReducers({
  root: defaultReducer,
  profile: profileReducer,
  liquidity: liquidityPoolReducer,
})

export default rootReducer
