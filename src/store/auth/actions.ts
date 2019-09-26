import * as actionTypes from './actionTypes'
import * as api from '../../api'
import * as alertActions from '../alert/actions'
import { history } from '../../helpers/history'

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
        // history.push("/");
      },
      error => {
        dispatch({
          type: actionTypes.LOGIN_FAILURE
        })
        dispatch(alertActions.error(error))
      }
    )
  }
}

export const register = (user: any) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.REGISTER_REQUEST,
      user
    })

    api.register(user).then(
      (id_token: string) => {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          user: { ...user, token: id_token }
        })
        history.push('/login')
        dispatch(alertActions.success('Registration successful'))
      },
      (error: Error) => {
        dispatch({
          type: actionTypes.REGISTER_FAILURE,
          error: error.toString()
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
