import app from 'firebase/app';
import firebase from 'firebase';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAhNgu8TvNz330VVp1brDkDby5vfFJySw",
    authDomain: "proyectointegrador-2dfd0.firebaseapp.com",
    projectId: "proyectointegrador-2dfd0",
    storageBucket: "proyectointegrador-2dfd0.appspot.com",
    messagingSenderId: "533006629623",
    appId: "1:533006629623:web:13c7ca91cab0581bfb31f2"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();