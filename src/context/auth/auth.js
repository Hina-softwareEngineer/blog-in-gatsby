import React, { createContext, useEffect, useReducer, useState } from "react";
import firebase from "firebase";
import firebaseConfig from "../../firebase/firebaseConfig";
import { authReducer } from "./authReducer";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export const AuthContext = createContext(null);

let initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const GlobalAuthProvider = (props) => {
  const [snackBar, setSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("Log Out Failed!");
  let [state, dispatch] = useReducer(authReducer, initialState);

  const signUpwithGoogle = (callBack) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;

        dispatch({
          type: "LOGIN_SUCCESSFULLY",
          payload: user,
          accessToken: token,
        });
        callBack();
      })
      .catch(function (error) {
        dispatch({
          type: "LOGIN_FAILED",
          payload: error,
        });
      });
  };

  const onSignInWithFacebook = (callBack) => {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        dispatch({
          type: "LOGIN_SUCCESSFULLY",
          payload: user,
          accessToken: token,
        });
        callBack();
      })
      .catch(function (error) {
        dispatch({
          type: "LOGIN_FAILED",
          payload: error,
        });
        setMessageSnackBar("Login Failed!");
        setSnackBar(true);
      });
  };

  const getSignedInUser = async () => {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch({
          type: "LOADING",
          payload: user,
        });
      } else {
        console.log("sign out");
        dispatch({
          type: "LOADED",
        });
      }
    });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log("Log out succesfully", res);
        dispatch({
          type: "SIGN_OUT",
        });
      })
      .catch((e) => {
        setMessageSnackBar("Logout Failed");
        setSnackBar(true);
      });
  };

  useEffect(() => {
    getSignedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ state, signUpwithGoogle, signOut, onSignInWithFacebook }}
    >
      {props.children}
      <Snackbar
        open={snackBar}
        autoHideDuration={3000}
        onClose={() => setSnackBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackBar(false)} severity="error">
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
