import { WebPlugin } from '@capacitor/core';

import type { Auth0CapacitorPlugin } from './definitions';

export class Auth0CapacitorWeb
  extends WebPlugin
  implements Auth0CapacitorPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
