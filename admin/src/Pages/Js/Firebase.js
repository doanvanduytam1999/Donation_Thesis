import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app' 

var firebaseConfig = {
  apiKey: "AIzaSyDFlce1nx_WeDvvyQFoQY_VnLVXQMOdk7o",
  authDomain: "donate-d9fdf.firebaseapp.com",
  projectId: "donate-d9fdf",
  storageBucket: "donate-d9fdf.appspot.com",
  messagingSenderId: "347035314172",
  appId: "1:347035314172:web:4d444bcf026fcaa1087479",
  measurementId: "G-Q7YTPWCG86"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage(); 

firebase.analytics();
firebase.auth()


export  {
  storage, firebase as default
}