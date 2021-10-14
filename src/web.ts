import { WebPlugin } from '@capacitor/core';

import type { Auth0CapacitorPlugin } from './definitions';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

export class Auth0CapacitorWeb
  extends WebPlugin
  implements Auth0CapacitorPlugin {

  _auth0?: Promise<Auth0Client>;
  domain?: string;
  client_id?: string;

  get auth0() {
    return this._auth0;
  }

  set auth0(client) {
    this._auth0 = client;
  }

  async createAuth0Client(options: {
    domain: string;
    clientId: string;
  }): Promise<void> {
    
    this.auth0 = createAuth0Client({
      domain: options.domain,
      client_id: options.clientId
    });

    this.domain = options.domain;
    this.client_id = options.clientId
  }
  
  async login(clientOptions: {
    domain: string;
    clientId: string;
  }, options: {
    scope: string;
    appState?: string;
    audience: string;
    redirect_uri?: string
  }): Promise<any> {

    try {
      const client: Auth0Client = await createAuth0Client({
        domain: clientOptions.domain,
        client_id: clientOptions.clientId
      });
      const query = window.location.search;
      if (query.includes("code=") && query.includes("state=")) {
        // Process the login state
        
        const resultP = client?.handleRedirectCallback()
        .then((result) => {
          console.log(result);
          if (result) return client?.getTokenSilently();
          else throw 'Not authenticated';
        }).catch(err => {
          console.error(err);
          throw err;
        });
        return await resultP;

      } else {
        throw 'not authenticated';
      }
    } catch (err) {
      (await this.auth0)?.loginWithRedirect({
        ...options
      });
    }

    
  }

  async renew() {
    const client = await this.auth0;
    const isAuth = client?.isAuthenticated();
    if (isAuth) {
      return client?.getTokenSilently()
    } else {
      const query = window.location.search;
      if (query.includes("code=") && query.includes("state=")) {
        // Process the login state
        return client?.handleRedirectCallback(location.href)
        .then((result) => {
          console.log(result);
          return client?.getTokenSilently();
        });
    } else {
        throw 'not authenticated';
      }
    }
  }
  
  async logout() {
    (await this.auth0)?.logout({
      returnTo: window.location.origin
    });
  }

  async getUser(): Promise<any>{ 
    (await this.auth0)?.getUser();
  }

  async getTokenSilently(): Promise<{ accessToken: string; idToken: string; expiresIn: string, refreshToken: string; }> {
    return this.renew();
  }
}


