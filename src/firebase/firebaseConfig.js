import firebase from "firebase";
import "firebase/app";
import "firebase/auth";

// require("dotenv").config({
//   path: `.env`,
// });

// let {
//   API_KEY,
//   AUTH_DOMAIN,
//   AUTH_DATABASE_URL,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSENGING_SENDER_ID,
//   APP_ID,
// } = process.env;

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.AUTH_DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSENGING_SENDER_ID,
  appId: process.env.APP_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

export default { firebaseConfig };
