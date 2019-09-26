import * as actionTypes from './actionTypes'
import { TransactionsState } from './models'

const initialState = { transactions: [], transactionsLoading: false }

export const transactionsReducer = (
  state: TransactionsState = initialState,
  action: any
) => {
  switch (action.type) {
    case actionTypes.FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        transactionsLoading: true
      }
    case actionTypes.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.transactions,
        transactionsLoading: false
      }
    case actionTypes.FETCH_TRANSACTIONS_ERROR:
      return {
        ...state,
        transactionsLoading: false
      }
    default:
      return state
  }
}
