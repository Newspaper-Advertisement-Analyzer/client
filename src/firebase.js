import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";

// Load environment variables
const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const databaseURL = process.env.REACT_APP_DATABASE_URL;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAjKWWDuBXnKH40Ik3GX_4MIDUcjFGfjX4",
//   authDomain: "advizor-71682.firebaseapp.com",
//   projectId: "advizor-71682",
//   storageBucket: "advizor-71682.appspot.com",
//   messagingSenderId: "436861904344",
//   appId: "1:436861904344:web:52966dfa3937c3c9e9bead",
//   measurementId: "G-4MSLN0VTVP",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const storage = getStorage(app);

export { auth, provider, storage };
