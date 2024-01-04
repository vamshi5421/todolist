// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA6W13BkH3I9Db3xMXEgtKUnGviauYbT2o',
  authDomain: 'todo-intern-project.firebaseapp.com',
  projectId: 'todo-intern-project',
  storageBucket: 'todo-intern-project.appspot.com',
  messagingSenderId: '825868012534',
  appId: '1:825868012534:web:8ac6801308995cccf955d7',
  measurementId: 'G-3YVSXQX275',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
