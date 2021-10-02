package com.cardihab.app.auth0capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Auth0Capacitor")
public class Auth0CapacitorPlugin extends Plugin {

    private Auth0Capacitor implementation = new Auth0Capacitor();

    @PluginMethod
    public void createAuth0Client(PluginCall call) {
        call.resolve();
    }

    @PluginMethod
    public void login(PluginCall call) {
        String scope = call.getString("scope");
        String  audience = call.getString("audience");

        call.resolve();
    }

    @PluginMethod
    public void logout(PluginCall call) {
        call.resolve();
    }

    @PluginMethod
    public void getUser(PluginCall call) {
        call.resolve();
    }
}
