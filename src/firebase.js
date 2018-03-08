import * as firebase from 'firebase'

  // Initialize Firebase
var config = {
  apiKey: "AIzaSyCfjjXSjoH7XCnGgWPQM9B6MfrDAaOKARU",
  authDomain: "tickets-f9b85.firebaseapp.com",
  databaseURL: "https://tickets-f9b85.firebaseio.com",
  projectId: "tickets-f9b85",
  storageBucket: "tickets-f9b85.appspot.com",
  messagingSenderId: "358400286594"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('/notes');
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

