import * as actionTypes from './actionTypes'
import * as api from '../../api'
import { history } from '../../helpers/history'

export const getUserInfo = () => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.GET_USER_INFO_REQUEST
    })

    api.getUserInfo().then(
      user =>
        dispatch({
          type: actionTypes.GET_USER_INFO_SUCCESS,
          user
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
  ;(dispatch: any) => {
    dispatch({ type: actionTypes.COMMIT_TRANSACTION_REQUEST })

    api.commitTransaction(name, amount).then(
      transaction => {
        dispatch({
          type: actionTypes.COMMIT_TRANSACTION_SUCCESS,
          transaction
        })
        // history.push('/')
      },
      error => {
        dispatch({
          type: actionTypes.COMMIT_TRANSACTION_ERROR,
          error
        })
      }
    )
  }
}
