import * as actionTypes from './actionTypes'
import { AlertState } from './models'

export const alertReducer = (state: AlertState = {}, action: any) => {
  switch (action.type) {
    case actionTypes.ALERT_SUCCESS:
      return {
        alert: {
          alertType: 'alert-success',
          message: action.message
        }
      }
    case actionTypes.ALERT_ERROR:
      return {
        alert: {
          alertType: 'alert-danger',
          message: action.message
        }
      }
    case actionTypes.ALERT_CLEAR:
      return {}
    default:
      return state
  }
}
