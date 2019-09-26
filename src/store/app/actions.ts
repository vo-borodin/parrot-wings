import * as actionTypes from './actionTypes'
import * as api from '../../api'
import * as alertActions from '../alert/actions'

export const getUserInfo = () => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_USER_INFO_REQUEST
    })

    api.getUserInfo().then(
      payload =>
        dispatch({
          type: actionTypes.GET_USER_INFO_SUCCESS,
          payload
        }),
      error =>
        dispatch({
          type: actionTypes.GET_USER_INFO_FAILURE,
          error
        })
    )
  }
}

export const getAllUsers = () => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_ALL_USERS_REQUEST
    })

    api.getAll().then(
      users =>
        dispatch({
          type: actionTypes.GET_ALL_USERS_SUCCESS,
          users
        }),
      error =>
        dispatch({
          type: actionTypes.GET_ALL_USERS_FAILURE,
          error
        })
    )
  }
}

export const commitTransaction = (name: string, amount: number) => {
  return (dispatch: any) => {
    dispatch({ type: actionTypes.COMMIT_TRANSACTION_REQUEST })

    api.commitTransaction(name, amount).then(
      balance => {
        dispatch({
          type: actionTypes.COMMIT_TRANSACTION_SUCCESS,
          balance
        })
        dispatch(alertActions.success('Transaction is done'))
      },
      error => {
        dispatch({
          type: actionTypes.COMMIT_TRANSACTION_ERROR,
          error
        })
        dispatch(alertActions.error(`Transaction is failed: ${error}`))
      }
    )
  }
}
