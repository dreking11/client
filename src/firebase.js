import firebase from "firebase/app";
import "firebase/auth";
// firebase config
const config = {
  apiKey: "AIzaSyBJ04ugqLu0RP4FX3IVuChrbU0QJK-QXDE",
  authDomain: "ecommerce-d0b6e.firebaseapp.com",
  projectId: "ecommerce-d0b6e",
  messagingSenderId: "405330596392",
  appId: "1:405330596392:web:024b7a4bcbd74f9f2f5b1d",
  measurementId: "G-S6F5GLR83T"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();