package com.cardihab.app.auth0capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Auth0Capacitor")
public class Auth0CapacitorPlugin extends Plugin {

    private Auth0Capacitor implementation;

    @Override
    public void load() {
        implementation = new Auth0Capacitor(this.getActivity().getApplicationContext());
    }

    @PluginMethod
    public void createAuth0Client(PluginCall call) {
        String domain = call.getString("domain");
        String clientId = call.getString("clientId");
        String scheme = call.getString("scheme", "com.myclubsmyscores.ClaytargetApp");

        implementation.createAuth0Client(domain, clientId, scheme, call);
    }

    @PluginMethod
    public void login(PluginCall call) {
        String scope = call.getString("scope");
        String audience = call.getString("audience");

        implementation.login(scope, audience, call);
    }

    @PluginMethod
    public void handleRedirect(PluginCall call) {
        call.unimplemented("Not implemented on Android.");
    }

    @PluginMethod
    public void renew(PluginCall call) {
        call.unimplemented("Not implemented on Android.");
    }

    @PluginMethod
    public void logout(PluginCall call) {
        implementation.logout(call);
    }

    @PluginMethod
    public void getUser(PluginCall call) {
        implementation.getUser(call);
    }

    @PluginMethod
    public void getTokenSilently(PluginCall call) {
        call.unimplemented("Not implemented on Android.");

    }
}
