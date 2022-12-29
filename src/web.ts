import { WebPlugin } from '@capacitor/core';

import type { Auth0CapacitorPlugin } from './definitions';
import { createAuth0Client, Auth0Client, GetTokenSilentlyVerboseResponse } from '@auth0/auth0-spa-js';

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
    authorizationParams: {
      redirect_uri: string;
    };
  }): Promise<void> {
    this.auth0 = createAuth0Client({
      domain: options.domain,
      clientId: options.clientId,
      authorizationParams: options.authorizationParams
    });

    this.domain = options.domain;
    this.client_id = options.clientId
  }
  
  async login(options: {
    scope: string;
    appState?: string;
    audience: string;
    redirect_uri?: string
  }): Promise<any> {
    console.log("Logging in! 1");

    (await this.auth0)?.loginWithRedirect({
      ...options
    });
  }

  async handleRedirect(): Promise<any> {
    const query = window.location.search;

    if (!query.length) return;
    
    if (query.includes("code=") && query.includes("state=")) {
      // Process the login state
      const resultP = (await this.auth0)?.handleRedirectCallback()
        .then(async (result) => {
          console.log(result);
          return (await this.auth0)?.getTokenSilently();
        });

      return await resultP;

    }
  }

  async renew(): Promise<GetTokenSilentlyVerboseResponse | undefined> {
    const client = await this.auth0;
    const isAuth = client?.isAuthenticated();

    if (isAuth) {
      return client?.getTokenSilently({ detailedResponse: true })
    } else {
      const query = window.location.search;
      if (query.includes("code=") && query.includes("state=")) {
        // Process the login state
        return client?.handleRedirectCallback(location.href)

        .then((result) => {
          console.log(result);

          return client?.getTokenSilently({ detailedResponse: true });
        });
    } else {
        throw 'not authenticated';
      }
    }
  }
  
  async logout() {
    (await this.auth0)?.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  async getUser(): Promise<any>{ 
    return (await this.auth0)?.getUser();
  }

  async getTokenSilently(): Promise<GetTokenSilentlyVerboseResponse | undefined> {
    return this.renew();
  }
}


