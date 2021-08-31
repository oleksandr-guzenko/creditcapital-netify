import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const thunkMiddleware = [thunk]

// remove composeWithDevTools in production
const composeWithDevTools = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const {composeWithDevTools} = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const store = createStore(rootReducer, composeWithDevTools(thunkMiddleware))

export {store}
