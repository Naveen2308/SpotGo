import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA4R1J_Gr4DY0frkb-76apighTn07Ybu1I",
    authDomain: "spotgo-38679.firebaseapp.com",
    projectId: "spotgo-38679",
    storageBucket: "spotgo-38679.firebasestorage.app",
    messagingSenderId: "621911695496",
    appId: "1:621911695496:web:4fec5b5a1f034254473f3d",
    measurementId: "G-8BS2RGXMG3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
