import {
    getApp,
    getApps,
    initializeApp
} from 'firebase/app'
import {
    getStorage
} from 'firebase/storage';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// const firebaseConfig = {
// apiKey: "AIzaSyD97IPveSJ-skmjqhtaoFOjzFy2ZGI3unI",
//     authDomain: "project-music-app-7a53e.firebaseapp.com",
//     projectId: "project-music-app-7a53e",
//     storageBucket: "project-music-app-7a53e.appspot.com",
//     messagingSenderId: "954712703756",
//     appId: "1:954712703756:web:00c2d26585c4150999bf29"
// };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app)

export {app,storage} ;