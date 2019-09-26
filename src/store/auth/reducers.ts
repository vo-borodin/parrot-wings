import * as actionTypes from './actionTypes'
import { AuthState } from './models'

const jwtToken = localStorage.getItem('jwtToken')
const initialState = {
  isAuthenticated: Boolean(jwtToken),
  authenticating: false,
  registering: false
}

export const authReducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        isAuthenticated: false,
        authenticating: true,
        registering: false
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        authenticating: false,
        registering: false
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        isAuthenticated: false,
        authenticating: false,
        registering: false
      }
    case actionTypes.REGISTER_REQUEST:
      return {
        isAuthenticated: false,
        authenticating: false,
        registering: true
      }
    case actionTypes.REGISTER_SUCCESS:
      return {
        isAuthenticated: false,
        authenticating: false,
        registering: false
      }
    case actionTypes.REGISTER_FAILURE:
      return {
        isAuthenticated: false,
        authenticating: false,
        registering: false
      }
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        authenticating: false,
        registering: false
      }
    default:
      return state
  }
}
