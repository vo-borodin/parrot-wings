import { combineReducers } from 'redux'

import { alertReducer } from './alert/reducers'
import { appReducer } from './app/reducers'
import { authReducer } from './auth/reducers'
import { transactionsReducer } from './transactions/reducers'

const rootReducer = combineReducers({
  alertState: alertReducer,
  appState: appReducer,
  authState: authReducer,
  transactionsState: transactionsReducer
})

export default rootReducer
