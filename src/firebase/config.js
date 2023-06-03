import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5H2WZ1Gjot3Q8dcXz6tZmKaFvWeJ3oeA",
    authDomain: "fir-1376e.firebaseapp.com",
    projectId: "fir-1376e",
    storageBucket: "fir-1376e.appspot.com",
    messagingSenderId: "926697784861",
    appId: "1:926697784861:web:ad5fd1fcd9060ef156e8f4",
    measurementId: "G-VWDHLDXRQN",
    
  };
  export  const Firebase = initializeApp(firebaseConfig);
  export  const db = getFirestore(Firebase);
  export const storage = getStorage(Firebase);