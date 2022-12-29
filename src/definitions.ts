import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

export interface Auth0CapacitorPlugin {
  createAuth0Client(options: {
    domain: string;
    clientId: string;
    authorizationParams: {
      redirect_uri: string;
    }
  }): Promise<void>;

  login(options: { 
    scope: string;
    audience: string;
    appState?: string;
    redirect_uri?: string
  }): Promise<GetTokenSilentlyVerboseResponse>;
  
  logout(): Promise<void>;

  handleRedirect(): Promise<any>;

  renew(): Promise<GetTokenSilentlyVerboseResponse | undefined>;

  getUser(): Promise<{[key:string]:any}>;

  getTokenSilently(): Promise<GetTokenSilentlyVerboseResponse | undefined>
}

