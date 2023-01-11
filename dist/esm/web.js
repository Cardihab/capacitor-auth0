import { WebPlugin } from '@capacitor/core';
import { createAuth0Client } from '@auth0/auth0-spa-js';
export class Auth0CapacitorWeb extends WebPlugin {
    get auth0() {
        return this._auth0;
    }
    set auth0(client) {
        this._auth0 = client;
    }
    async createAuth0Client(options) {
        this.auth0 = createAuth0Client({
            domain: options.domain,
            clientId: options.clientId,
            authorizationParams: options.authorizationParams
        });
        this.domain = options.domain;
        this.client_id = options.clientId;
    }
    async login(options) {
        var _a;
        console.log("Logging in! 1");
        (_a = (await this.auth0)) === null || _a === void 0 ? void 0 : _a.loginWithRedirect(Object.assign({}, options));
    }
    async handleRedirect() {
        var _a;
        const query = window.location.search;
        if (!query.length)
            return;
        if (query.includes("code=") && query.includes("state=")) {
            // Process the login state
            const resultP = (_a = (await this.auth0)) === null || _a === void 0 ? void 0 : _a.handleRedirectCallback().then(async (result) => {
                var _a;
                console.log(result);
                return (_a = (await this.auth0)) === null || _a === void 0 ? void 0 : _a.getTokenSilently();
            });
            return await resultP;
        }
    }
    async renew() {
        const client = await this.auth0;
        const isAuth = client === null || client === void 0 ? void 0 : client.isAuthenticated();
        if (isAuth) {
            return client === null || client === void 0 ? void 0 : client.getTokenSilently({ detailedResponse: true });
        }
        else {
            const query = window.location.search;
            if (query.includes("code=") && query.includes("state=")) {
                // Process the login state
                return client === null || client === void 0 ? void 0 : client.handleRedirectCallback(location.href).then((result) => {
                    console.log(result);
                    return client === null || client === void 0 ? void 0 : client.getTokenSilently({ detailedResponse: true });
                });
            }
            else {
                throw 'not authenticated';
            }
        }
    }
    async logout() {
        var _a;
        (_a = (await this.auth0)) === null || _a === void 0 ? void 0 : _a.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    }
    async getUser() {
        var _a;
        return (_a = (await this.auth0)) === null || _a === void 0 ? void 0 : _a.getUser();
    }
    async getTokenSilently() {
        return this.renew();
    }
}
//# sourceMappingURL=web.js.map