import { firebase } from "@firebase/app";
import "@firebase/firestore";

// obtain this chunk of info from your firebase console
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD0tjeOI6LqtDa6aSqNK77SL_-2iw36t1w",
  authDomain: "login-d41be.firebaseapp.com",
  databaseURL: "https://login-d41be.firebaseio.com",
  projectId: "login-d41be",
  storageBucket: "login-d41be.appspot.com",
  messagingSenderId: "229904947910"
});

export const db = firebaseApp.firestore();
