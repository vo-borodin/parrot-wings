import * as actionTypes from "./actionTypes";
import * as api from "../../api";
import * as alertActions from "../alert/actions";
import { history } from "../../helpers/history";

export const login = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
      user: { email }
    });

    api.login(email, password).then(
      user => {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          user
        });
        history.push("/");
      },
      error => {
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          error
        });
        dispatch(alertActions.error(error));
      }
    );
  };
};

export const register = (user: any) => {
  return (dispatch: any) => {
    dispatch({
      type: actionTypes.REGISTER_REQUEST,
      user
    });

    api.register(user).then(
      (user: any) => {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          user
        });
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error: Error) => {
        dispatch({
          type: actionTypes.REGISTER_FAILURE,
          error: error.toString()
        });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

export const logout = () => {
  api.logout();
  return { type: actionTypes.LOGOUT };
};
