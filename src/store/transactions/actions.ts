import * as actionTypes from './actionTypes'
import * as alertActions from '../alert/actions'
import * as api from '../../api'

export const fetchTransactions = () => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.FETCH_TRANSACTIONS_REQUEST
    })

    api.fetchTransactions().then(
      transactions => {
        dispatch({
          type: actionTypes.FETCH_TRANSACTIONS_SUCCESS,
          transactions
        })
      },
      error => {
        dispatch({
          type: actionTypes.FETCH_TRANSACTIONS_ERROR
        })
        dispatch(alertActions.error(`Error on fetching transactions: ${error}`))
      }
    )
  }
}
