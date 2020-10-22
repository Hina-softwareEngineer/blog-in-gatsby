import React, { createContext, useEffect, useReducer } from "react";
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

  const signUpwithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        dispatch({
          type: "LOGIN_SUCCESSFULLY",
          payload: user,
          accessToken: token,
        });
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        dispatch({
          type: "LOGIN_FAILED",
          payload: error,
        });
        // ...
      });
  };

  const onSignInWithFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        dispatch({
          type: "LOGIN_SUCCESSFULLY",
          payload: user,
          accessToken: token,
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        dispatch({
          type: "LOGIN_FAILED",
          payload: error,
        });
        // ...
      });
  };

  const getSignedInUser = async () => {
    let userReturn = undefined;
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("user getsignedin", user);
        userReturn = user;
        dispatch({
          type: "LOADING",
          payload: user,
        });
        // ...
      } else {
        // ...
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
      value={{ state, signUpwithGoogle, signOut, onSignInWithFacebook }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
