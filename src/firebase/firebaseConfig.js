import firebase from "firebase";
import "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD0RxJ1sp1BqqLIIEr_MvB7srfAQC2nb0",
  authDomain: "hina-blogs.firebaseapp.com",
  databaseURL: "https://hina-blogs.firebaseio.com",
  projectId: "hina-blogs",
  storageBucket: "hina-blogs.appspot.com",
  messagingSenderId: "96993841076",
  appId: "1:96993841076:web:f982a9ed31426b4ab8ece1",
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

export default { firebaseConfig };
