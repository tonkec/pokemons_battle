// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyBrQ5aDpDZ6LN3P9BNHT6HD0eM0ejPSKxc',
  authDomain: 'pokemon-d28e5.firebaseapp.com',
  projectId: 'pokemon-d28e5',
  storageBucket: 'pokemon-d28e5.appspot.com',
  messagingSenderId: '429542102003',
  appId: '1:429542102003:web:f5d49cb0c6a27a5e3fb886',
  measurementId: 'G-23N5VN1N4K',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
export const firestore = getFirestore(app);
