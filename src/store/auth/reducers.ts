import * as actionTypes from "./actionTypes";

const item = localStorage.getItem("user");
let user = item ? JSON.parse(item) : null;
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: any) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case actionTypes.LOGIN_FAILURE:
      return {};
    case actionTypes.REGISTER_REQUEST:
      return {
        registering: true
      };
    case actionTypes.REGISTER_SUCCESS:
      return {};
    case actionTypes.REGISTER_FAILURE:
      return {};
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
}
