import firebase from "firebase";
import "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_AUTH_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

export default { firebaseConfig };
