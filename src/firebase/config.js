// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();

// console.log(process.env);
// console.log( import.meta.env );

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Dev/Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyBszVBvcb4_Y8U81-A0sMQKk8swRU8fI8I",
//   authDomain: "react-cursos-be336.firebaseapp.com",
//   projectId: "react-cursos-be336",
//   storageBucket: "react-cursos-be336.appspot.com",
//   messagingSenderId: "981498573436",
//   appId: "1:981498573436:web:753c8169312b9f5dba0ff9",
//   measurementId: "G-4F7NK39SZB"
// };

//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyD1ROoVjVIFp8tG9KYvRx7O5oaItVklXlk",
//   authDomain: "fir-testing-da0b9.firebaseapp.com",
//   projectId: "fir-testing-da0b9",
//   storageBucket: "fir-testing-da0b9.appspot.com",
//   messagingSenderId: "1353163672",
//   appId: "1:1353163672:web:26bedbeb9101878e29c1ed"
// };

const firebaseConfig = {
  apiKey:VITE_APIKEY,
  authDomain:VITE_AUTHDOMAIN,
  projectId:VITE_PROJECTID,
  storageBucket:VITE_STORAGEBUCKET,
  messagingSenderId:VITE_MESSAGINGSENDERID,
  appId:VITE_APPID,
};

// console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp); 