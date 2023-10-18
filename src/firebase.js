// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9ogrirNA7KFB3BSHEISLkxeShbobPOTM",
    authDomain: "warehousebridge-be70d.firebaseapp.com",
    projectId: "warehousebridge-be70d",
    storageBucket: "warehousebridge-be70d.appspot.com",
    messagingSenderId: "536927736784",
    appId: "1:536927736784:web:8536a2ed413abbaec31fd5",
    measurementId: "G-NQWDVLRLX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getStorage } from 'firebase/storage'
const storage = getStorage(app)

export { storage }