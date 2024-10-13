// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {  initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH9xN1z9x7cKG1u4mYrmfGVlRP-rGe8WA",
  authDomain: "moviles-cebe6.firebaseapp.com",
  projectId: "moviles-cebe6",
  storageBucket: "moviles-cebe6.appspot.com",
  messagingSenderId: "380775923782",
  appId: "1:380775923782:web:a46eb28d62998394d78a47",
  databaseUrl:"https://moviles-cebe6-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth =initializeAuth(firebase,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
});
export const dbRealTime = getDatabase(firebase)
