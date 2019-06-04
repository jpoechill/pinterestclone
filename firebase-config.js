import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCGCgCTu9OwUZbprgmqH9-KCTp0jjKtCFs",
  authDomain: "vuevuexprettygirlsapi.firebaseapp.com",
  databaseURL: "https://vuevuexprettygirlsapi.firebaseio.com",
  projectId: "vuevuexprettygirlsapi",
  storageBucket: "vuevuexprettygirlsapi.appspot.com",
  messagingSenderId: "187458410833"
};

let firebaseApp

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(config)
} else {
  firebaseApp = firebase
}

const firestore = firebaseApp.firestore()
const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);

export default {
  firebaseApp,
  firestore
}