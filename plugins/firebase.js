import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
/* eslint no-var: */
var firebaseConfig = {
  apiKey: "AIzaSyAPukIubvOHbV7Wsq7ynAm6UZ-omN73jAY",
  authDomain: "project-cs343-cs313.firebaseapp.com",
  databaseURL: "https://project-cs343-cs313.firebaseio.com",
  projectId: "project-cs343-cs313",
  storageBucket: "project-cs343-cs313.appspot.com",
  messagingSenderId: "744183508073",
  appId: "1:744183508073:web:ab42dda0ed0cb5574586f8",
  measurementId: "G-96HS79KNC8",
};

let app = null;
/* eslint-disable no-unused-vars */
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}
/* eslint-disable no-unused-vars */
export default firebase;
export const db = firebase.firestore();
