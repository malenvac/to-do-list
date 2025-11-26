import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";

export  const firebaseConfig = {
  apiKey: "AIzaSyAcuPmQpIrwDTNgya47-TD4ILc-5BJA-Dw",
  authDomain: "to-do-list-6961f.firebaseapp.com",
  projectId: "to-do-list-6961f",
  storageBucket: "to-do-list-6961f.firebasestorage.app",
  messagingSenderId: "995717581754",
  appId: "1:995717581754:web:bd093c82007b8aa13c6b83",
  measurementId: "G-ETC5NJ8D1Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 1000;

export { app, analytics, remoteConfig };
