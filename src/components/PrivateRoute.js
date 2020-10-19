import React, { useContext } from "react";
import { navigate } from "gatsby";
import { AuthContext } from "../context/auth/auth";

function PrivateRoute({ component: Component, location, ...rest }) {
  const authentication = useContext(AuthContext);
  // let auth = useContext(AuthContext);

  // console.log(auth, "protected");

  // if (false) {
  //   // navigate("/");
  //   return null;
  // }

  return <Component {...rest} />;
}

export { PrivateRoute };
