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
        console.log(result, "result authentication");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
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
        // ...
      });
  };

  const getSignedInUser = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("on auth changed", user);
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => console.log("Log out succesfully", res))
      .catch((e) => console.log("Logout failed", e));
  };

  return (
    <AuthContext.Provider
      value={{ signUpwithGoogle, getSignedInUser, signOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
