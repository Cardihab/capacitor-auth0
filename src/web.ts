import { WebPlugin } from '@capacitor/core';

import type { Auth0CapacitorPlugin } from './definitions';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

export class Auth0CapacitorWeb
  extends WebPlugin
  implements Auth0CapacitorPlugin {

  auth0?: Auth0Client;

  async createAuth0Client(options: {
    domain: string;
    clientId: string;
  }): Promise<void> {
    this.auth0 = await createAuth0Client({
      domain: options.domain,
      client_id: options.clientId
    });
  }
  
  async login(options: {
    scope: string;
    appState?: string;
    audience: string;
  }): Promise<any> {

    try {
      const isAuth = await this.auth0?.isAuthenticated();
      if (isAuth) {
        return await this.auth0?.getTokenSilently()
      } else {
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
          // Process the login state
          const result = await this.auth0?.handleRedirectCallback();
          console.log(result);
          return await this.auth0?.getTokenSilently();
        } else {
          throw 'not authenticated';
        }
      }
    } catch (err) {
      await this.auth0?.loginWithRedirect({
        ...options,
        redirect_uri: window.location.origin
      });
    }

    
  }

  async renew() {
    return await this.auth0?.getTokenSilently();
  }
  
  async logout() {
    this.auth0?.logout({
      returnTo: window.location.origin
    });
  }

  async getUser(): Promise<any>{ 
    this.auth0?.getUser();
  }
}


