// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase } from 'firebase/database';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC7B7EY0wIPCqXCxmLnxgkreo2STNeMUZI',
  authDomain: 'counter-app-81aa4.firebaseapp.com',
  databaseURL:
    'https://counter-app-81aa4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'counter-app-81aa4',
  storageBucket: 'counter-app-81aa4.firebasestorage.app',
  messagingSenderId: '702237512977',
  appId: '1:702237512977:web:ec544631dc56d3cea9a8b0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
