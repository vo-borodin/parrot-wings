import * as actionTypes from './actionTypes'
import * as api from '../../api'
import * as alertActions from '../alert/actions'

export const login = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.LOGIN_REQUEST
    })

    api.login(email, password).then(
      () => {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS
        })
        dispatch(alertActions.success('You are successfully authenticated'))
      },
      error => {
        dispatch({
          type: actionTypes.LOGIN_FAILURE
        })
        dispatch(alertActions.error(error.toString()))
      }
    )
  }
}

export const register = (username: string, email: string, password: string) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.REGISTER_REQUEST
    })

    api.register(username, email, password).then(
      () => {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS
        })
        dispatch(alertActions.success('Registration successful'))
      },
      error => {
        dispatch({
          type: actionTypes.REGISTER_FAILURE
        })
        dispatch(alertActions.error(error.toString()))
      }
    )
  }
}

export const logout = () => {
  api.logout()
  return { type: actionTypes.LOGOUT }
}
