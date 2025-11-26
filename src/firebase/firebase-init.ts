import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';
import { firebaseConfig } from './firebase-config';


const app = initializeApp(firebaseConfig);
export const remoteConfig = getRemoteConfig(app);
