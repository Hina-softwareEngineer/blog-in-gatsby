import React, { useContext } from "react";
import { navigate } from "gatsby";
import { AuthContext } from "../auth/auth";

export const PrivateRoute = (props) => {
  // let auth = useContext(AuthContext);

  console.log(props, "protected");
  // if (true) {
  //   navigate("/");
  //   return null;
  // }
  return <div {...props} />;
};
// export default PrivateRoute;
