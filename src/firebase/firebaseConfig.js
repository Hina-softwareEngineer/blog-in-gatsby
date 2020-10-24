import firebase from "firebase";
import "firebase/app";
import "firebase/auth";

let {
  API_KEY,
  AUTH_DOMAIN,
  AUTH_DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSENGING_SENDER_ID,
  APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: AUTH_DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSENGING_SENDER_ID,
  appId: APP_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

export default { firebaseConfig };
