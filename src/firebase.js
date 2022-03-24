import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA_6bamR84wK9gqz7zkTebGoU0bgspkp2w',
  authDomain: 'punk-api-firebase-projec-14aa8.firebaseapp.com',
  projectId: 'punk-api-firebase-projec-14aa8',
  storageBucket: 'punk-api-firebase-projec-14aa8.appspot.com',
  messagingSenderId: '877617119838',
  appId: '1:877617119838:web:c2bce33852f86112fe6acf',
  measurementId: 'G-JF63QRTEDG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider};
