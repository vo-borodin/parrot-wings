import { RouteProps, RouteComponentProps, Redirect, Route } from "react-router";
import React from "react";

export const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error("component is undefined");
  }

  const Component = component;
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (localStorage.getItem("user")) {
      return <Component {...props} />;
    }
    return <Redirect to={{ pathname: "/login" }} />;
  };

  return <Route {...rest} render={render} />;
};
