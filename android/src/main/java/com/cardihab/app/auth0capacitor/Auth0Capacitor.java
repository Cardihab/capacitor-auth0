package com.cardihab.app.auth0capacitor;
import android.content.Context;
import android.content.res.Resources;

import androidx.annotation.NonNull;

import com.auth0.android.Auth0;
import com.auth0.android.authentication.AuthenticationAPIClient;
import com.auth0.android.authentication.AuthenticationException;
import com.auth0.android.callback.Callback;
import com.auth0.android.provider.WebAuthProvider;
import com.auth0.android.result.Credentials;
import com.auth0.android.result.UserProfile;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;

public class Auth0Capacitor {

    private Auth0 client;
    private Context context;
    private String accessToken;

    public Auth0Capacitor(Context context) {
        this.context = context;
    }

    public void createAuth0Client(String domain, String clientId) {
        client = new Auth0(clientId, domain);
    }

    public void login(String scope, String audience, PluginCall call) {
        WebAuthProvider.login(client)
            //.withScheme("Scheme? capacitor: I think?") // This is required if not using Android "App Links"
            .withScope(scope)
            .withAudience(audience)
            .start(context, new Callback<Credentials, AuthenticationException>() {
                @Override
                public void onFailure(@NonNull AuthenticationException e) {
                    call.reject(e.getLocalizedMessage(), e.getCode(), e);
                }

                @Override
                public void onSuccess(Credentials credentials) {
                    JSObject ret = new JSObject();

                    ret.put("id_token", credentials.getIdToken());
                    ret.put("access_token", credentials.getAccessToken());

                    accessToken = credentials.getAccessToken();

                    ret.put("expires_in", credentials.getExpiresAt());
                    ret.put("scope", credentials.getScope());

                    call.resolve(ret);
                }
            });
    }

    public void logout(PluginCall call) {
        WebAuthProvider.logout(client)
            //.withScheme("demo") // Same deal as above, just leaving it here in case I need it later
            .start(context, new Callback<Void, AuthenticationException>() {
                @Override
                public void onFailure(@NonNull AuthenticationException e) {
                    call.reject(e.getLocalizedMessage(), e.getCode(), e);
                }

                @Override
                public void onSuccess(Void payload) {
                    call.resolve();
                }
            });
    }

    public void getUser(PluginCall call) {
        new AuthenticationAPIClient(client)
                .userInfo(accessToken)
                .start(new Callback<UserProfile, AuthenticationException>() {
                    @Override
                    public void onFailure(@NonNull AuthenticationException e) {
                        call.reject(e.getLocalizedMessage(), e.getCode(), e);
                    }

                    @Override
                    public void onSuccess(UserProfile profile) {
                        JSObject ret = new JSObject();

                        ret.put("id", profile.getId());
                        ret.put("name", profile.getName());
                        ret.put("nickname", profile.getNickname());
                        ret.put("pictureURL", profile.getPictureURL());
                        ret.put("email", profile.getEmail());
                        ret.put("isEmailVerified", profile.isEmailVerified());
                        ret.put("familyName", profile.getFamilyName());
                        ret.put("createdAt", profile.getCreatedAt());
                        ret.put("identities", profile.getIdentities());
                        ret.put("extraInfo", profile.getExtraInfo());
                        ret.put("userMetadata", profile.getUserMetadata());
                        ret.put("appMetadata", profile.getAppMetadata());
                        ret.put("givenName", profile.getGivenName());

                        call.resolve(ret);
                    }
                });
    }
}