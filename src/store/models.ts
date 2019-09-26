import { AlertState } from './alert/models'
import { AppState } from './app/models'
import { AuthState } from './auth/models'
import { TransactionsState } from './transactions/models'

export interface GlobalState {
  alertState: AlertState
  appState: AppState
  authState: AuthState
  transactionsState: TransactionsState
}
