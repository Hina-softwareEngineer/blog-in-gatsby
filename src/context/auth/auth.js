import React, { createContext, useState,useEffect, useReducer,createRef } from "react";
import firebase from "firebase";
import firebaseConfig from "../../firebase/firebaseConfig";
import { authReducer } from "./authReducer";

export const AuthContext = createContext(null);

let initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const GlobalAuthProvider = (props) => {
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
      .catch((e) => console.log("Logout failed", e));
  };

  useEffect(() => {
    getSignedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ state, signUpwithGoogle, signOut, onSignInWithFacebook}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
