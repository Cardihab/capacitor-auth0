import { registerPlugin } from '@capacitor/core';
const Auth0Capacitor = registerPlugin('Auth0Capacitor', {
    web: () => import('./web').then(m => new m.Auth0CapacitorWeb()),
});
export * from './definitions';
export { Auth0Capacitor };
//# sourceMappingURL=index.js.map