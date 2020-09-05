import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../../utils/auth";

interface Props {
  component: any; // TODO: Figure out the actual type of an imported component
  path: string;
  location?: {
    pathname: string;
  };
}

const PrivateRoute = ({ component: Component, location, ...rest }: Props) => {
  if (
    !isLoggedIn() &&
    location !== undefined &&
    location.pathname !== "/login"
  ) {
    navigate("login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
