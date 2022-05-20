import firebaseConfig from "./config/firebaseCongig";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db};