import { remoteConfig } from './firebase-init';
import { fetchAndActivate } from 'firebase/remote-config';

export async function initializeRemoteConfig() {
  remoteConfig.settings = {
    minimumFetchIntervalMillis: 5000,
    fetchTimeoutMillis: 5000
  };

  await fetchAndActivate(remoteConfig);
}
