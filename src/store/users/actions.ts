import * as actionTypes from "./actionTypes";
import * as api from "../../api";

export const getAll = () => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.GETALL_REQUEST
    });

    api.getAll().then(
      users =>
        dispatch({
          type: actionTypes.GETALL_SUCCESS,
          users
        }),
      error =>
        dispatch({
          type: actionTypes.GETALL_FAILURE,
          error
        })
    );
  };
};
