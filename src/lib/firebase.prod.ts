import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from './seed';

const config = {
  apiKey: "AIzaSyBIi_IoQuGvQvVfoGOPRTGAWd33E_tl8B8",
  authDomain: "netflix-react-ts.firebaseapp.com",
  projectId: "netflix-react-ts",
  storageBucket: "netflix-react-ts.appspot.com",
  messagingSenderId: "91952530947",
  appId: "1:91952530947:web:ffcc6b659265c31c6eb036"
};

// Initialize Firebase
const firebase = Firebase.initializeApp(config);
// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };
