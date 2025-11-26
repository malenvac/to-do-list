import { Injectable } from '@angular/core';
import { remoteConfig } from '../../firebase/firebase-init';
import { fetchAndActivate, getBoolean } from 'firebase/remote-config';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {

  async load(): Promise<void> {
    await fetchAndActivate(remoteConfig);
  }

  async isCategoriesEnabled(): Promise<boolean> {
    return getBoolean(remoteConfig, 'categories_enabled');
  }
}
