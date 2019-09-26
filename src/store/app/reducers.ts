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
        currentUser: {
          email: action.payload.email,
          username: action.payload.username
        },
        balance: action.payload.balance
      }
    case actionTypes.GET_USER_INFO_FAILURE:
      return {
        ...state,
        currentUser: undefined,
        balance: 0
      }
    case actionTypes.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        usersLoading: true
      }
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        usersLoading: false,
        users: action.users
      }
    case actionTypes.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        usersLoading: false
      }
    case actionTypes.COMMIT_TRANSACTION_REQUEST:
      return {
        ...state,
        transactionCommiting: true
      }
    case actionTypes.COMMIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionCommiting: false,
        balance: action.balance
      }
    case actionTypes.COMMIT_TRANSACTION_ERROR:
      return {
        ...state,
        transactionCommiting: false
      }
    default:
      return state
  }
}
