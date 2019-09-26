import * as actionTypes from './actionTypes'
import { AppState } from './models'

const initialState = {
  balance: 0,
  transactionCommiting: false,
  users: [],
  usersLoading: false
}

export const appReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO_REQUEST:
      return state
    case actionTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        balance: action.balance
      }
    case actionTypes.GET_USER_INFO_FAILURE:
      return state
    case actionTypes.GET_ALL_USERS_REQUEST:
      return state
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.users
      }
    case actionTypes.GET_ALL_USERS_FAILURE:
      return state
    case actionTypes.COMMIT_TRANSACTION_REQUEST:
      return state
    case actionTypes.COMMIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        balance: action.balance
      }
    case actionTypes.COMMIT_TRANSACTION_ERROR:
      return state
    default:
      return state
  }
}
