import React, { createContext, useEffect, useReducer } from "react";
import firebase from "firebase";
import firebaseConfig from "../../firebase/firebaseConfig";

export const AuthContext = createContext(null);

export const GlobalAuthProvider = (props) => {
  //   let [state, dispatch] = useReducer();

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

  return (
    <AuthContext.Provider value={{ signUpwithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
};
