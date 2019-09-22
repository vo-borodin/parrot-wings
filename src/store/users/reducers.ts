import * as actionTypes from "./actionTypes";

export const users = (state = {}, action: any) => {
  switch (action.type) {
    case actionTypes.GETALL_REQUEST:
      return {
        loading: true
      };
    case actionTypes.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case actionTypes.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
};
