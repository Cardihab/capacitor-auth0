export interface Auth0CapacitorPlugin {
  createAuth0Client(options: {
    domain: string;
    clientId: string;
  }): Promise<void>;

  login(options: { 
    scope: string;
    audience: string;
    appState?: string;
  }): Promise<{ accessToken: string; idToken: string; expiresIn: string, refreshToken: string; }>;
  
  logout(): Promise<void>;

  renew(): Promise<{ accessToken: string; idToken: string; expiresIn: string, refreshToken: string; }>;

  getUser(): Promise<any>;
}

