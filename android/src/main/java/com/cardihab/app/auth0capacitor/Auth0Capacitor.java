package com.cardihab.app.auth0capacitor;
import com.auth0.android.Auth0
import com.auth0.android.provider.WebAuthProvider

public class Auth0Capacitor {
    private Auth0 account;

    public Auth0Capacitor() {
        account = new Auth0("aOxqvt3ndbssdrKtvrJE0fFzupkOgGQx", "cardihab-staging.us.auth0.com")
    }

    public void login(scope, audience) {
        WebAuthProvider.login(account)
                .withScheme("com.cardihab.app")
                .withScope(scope)

                // Launch the authentication passing the callback where the results will be received
                .start(this, new Callback<Credentials, AuthenticationException>() {
                    // Called when there is an authentication failure
                    override fun onFailure(exception: AuthenticationException) {
                        // Something went wrong!
                    }

                    // Called when authentication completed successfully
                    override fun onSuccess(credentials: Credentials) {
                        // Get the access token from the credentials object.
                        // This can be used to call APIs
                        val accessToken = credentials.accessToken
                    }
        })
    }

    public void logout() {

    }

    public void getUser() {

    }
}
