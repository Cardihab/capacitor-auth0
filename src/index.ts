import { registerPlugin } from '@capacitor/core';

import type { Auth0CapacitorPlugin } from './definitions';

const Auth0Capacitor = registerPlugin<Auth0CapacitorPlugin>('Auth0Capacitor', {
  web: () => import('./web').then(m => new m.Auth0CapacitorWeb()),
});

export * from './definitions';
export { Auth0Capacitor };
