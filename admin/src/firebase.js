import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyACJs9hv2PT9cZ4G7TsTx0zPE254FG7a8c",
  authDomain: "netflix-5c5af.firebaseapp.com",
  projectId: "netflix-5c5af",
  storageBucket: "netflix-5c5af.appspot.com",
  messagingSenderId: "343819539863",
  appId: "1:343819539863:web:f3b010bb6cd14c4bc260d2",
  measurementId: "G-LLJ5CJ77YN",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
