import * as actionTypes from "./actionTypes";

export const success = (message: string) => ({
  type: actionTypes.ALERT_SUCCESS,
  message
});

export const error = (message: string) => ({
  type: actionTypes.ALERT_ERROR,
  message
});

export const clear = () => ({
  type: actionTypes.ALERT_CLEAR
});
