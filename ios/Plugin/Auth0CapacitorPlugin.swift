import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(Auth0CapacitorPlugin)
public class Auth0CapacitorPlugin: CAPPlugin {
    private let implementation = Auth0Capacitor()

    @objc func createAuth0Client(_ call: CAPPluginCall) {
       implementation.domain = call.getString("domain") ?? ""
       implementation.clientId = call.getString("clientId") ?? ""

        call.resolve()
    }

    @objc func login(_ call: CAPPluginCall) {
        let scope = call.getString("scope") ?? ""
        let audience = call.getString("audience") ?? ""
//        let appState = call.getString("appState") ?? ""

        implementation.login(scope, audience) { result in
            switch result {
                case .failure(let error):
                    // Handle the error
                    print("Error: \(error)")
                    call.reject(error.localizedDescription)
                case .success(let credentials):
                    call.resolve([
                        "accessToken": credentials.accessToken!,
                        "idToken": credentials.idToken!,
                        "refreshToken": credentials.refreshToken!,
                        "expiresIn": credentials.expiresIn!
                    ])
            }
        }
    }

    @objc func renew(_ call: CAPPluginCall) {
        implementation.renew { result in
            switch result {
                case .failure(let error):
                    // Handle the error
                    print("Error: \(error)")
                    call.reject(error.localizedDescription)
                case .success(let credentials):
                    call.resolve([
                        "accessToken": credentials.accessToken!,
                        "idToken": credentials.idToken!,
                        "refreshToken": credentials.refreshToken!,
                        "expiresIn": credentials.expiresIn!
                    ])

            }
        }
    }

    @objc func getAccessTokenSilently(_ call: CAPPluginCall) {
        implementation.getAccessTokenSilently { result in
            switch result {
                case .failure(let error):
                    // Handle the error
                    print("Error: \(error)")
                    call.reject(error.localizedDescription)
                case .success(let credentials):
                    call.resolve([
                        "accessToken": credentials.accessToken!,
                        "idToken": credentials.idToken!,
                        "refreshToken": credentials.refreshToken!,
                        "expiresIn": credentials.expiresIn!
                    ])

            }
        }
    }

    @objc func logout(_ call: CAPPluginCall) {
        implementation.logout()
        call.resolve()
    }

    @objc func getUser(_ call: CAPPluginCall) {
        implementation.getUser { result in
            switch result {
            case .failure(let error):
                // Handle the error
                print("Error: \(error)")
                call.reject(error.localizedDescription)
            case .success(let profile):
                call.resolve([
                    "givenName": profile.givenName,
                    "familyName": profile.familyName,
                    "birthDate": profile.birthdate,
                    "gender": profile.gender
                ])
            }
        }
        
    }

}
