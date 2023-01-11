import { WebPlugin } from '@capacitor/core';
import type { Auth0CapacitorPlugin } from './definitions';
import { Auth0Client, GetTokenSilentlyVerboseResponse } from '@auth0/auth0-spa-js';
export declare class Auth0CapacitorWeb extends WebPlugin implements Auth0CapacitorPlugin {
    _auth0?: Promise<Auth0Client>;
    domain?: string;
    client_id?: string;
    get auth0(): Promise<Auth0Client> | undefined;
    set auth0(client: Promise<Auth0Client> | undefined);
    createAuth0Client(options: {
        domain: string;
        clientId: string;
        authorizationParams: {
            redirect_uri: string;
        };
    }): Promise<void>;
    login(options: {
        scope: string;
        appState?: string;
        audience: string;
        redirect_uri?: string;
    }): Promise<any>;
    handleRedirect(): Promise<any>;
    renew(): Promise<GetTokenSilentlyVerboseResponse | undefined>;
    logout(): Promise<void>;
    getUser(): Promise<any>;
    getTokenSilently(): Promise<GetTokenSilentlyVerboseResponse | undefined>;
}
