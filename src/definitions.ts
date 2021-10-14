export interface Auth0CapacitorPlugin {
  createAuth0Client(options: {
    domain: string;
    clientId: string;
  }): Promise<void>;

  login(client: {
    domain: string;
    clientId: string;
  }, options: { 
    scope: string;
    audience: string;
    appState?: string;
    redirect_uri?: string
  }): Promise<{ accessToken: string; idToken: string; expiresIn: string, refreshToken: string; }>;
  
  logout(): Promise<void>;

  renew(): Promise<{ accessToken: string; idToken: string; expiresIn: string, refreshToken: string; }>;

  getUser(): Promise<{[key:string]:any}>;

  getTokenSilently(): Promise<{ accessToken: string; idToken: string; expiresIn: string, refreshToken: string; }>
}

