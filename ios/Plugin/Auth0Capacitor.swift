import Auth0
import Foundation

@objc public class Auth0Capacitor: NSObject {
    let credentialsManager = CredentialsManager(authentication: Auth0.authentication())
    var clientId: String?
    var domain: String?

    public override init() {}
    public func login(_ scope: String, _ audience: String,  callback:  @escaping Request<Credentials, AuthenticationError>.Callback) -> Void {
        DispatchQueue.main.async {
            Auth0
                .webAuth(clientId: self.clientId!, domain: self.domain!)
                .logging(enabled: true)
                .useEphemeralSession()
                .scope(scope)
                .audience(audience)
                .start { result in
                    switch result {
                    case .failure(let error):
                        // Handle the error
                        print("Error: \(error)")
                        callback(result)
                    case .success(let credentials):
                        // Do something with credentials e.g.: save them.
                        // Auth0 will automatically dismiss the login page
                        print("Credentials: \(credentials)")
                        self.credentialsManager.store(credentials: credentials)
                        callback(result)
                    }
            }
        }
    }

    public func renew(callback:  @escaping Request<Credentials, AuthenticationError>.Callback) -> Void {
        self.credentialsManager.credentials { err, creds in

            if (err == nil && creds!.refreshToken != nil) {
                Auth0
                    .authentication()
                    .logging(enabled: true)
                    .renew(withRefreshToken: creds!.refreshToken!)
                    .start(callback)
            }
        }
        
    }

    public func getAccessTokenSilently(callback:  @escaping Request<Credentials, AuthenticationError>.Callback) -> Void {
        self.credentialsManager.credentials { err, creds in
            if (err == nil) {
                if (creds!.expiresIn != nil &&  creds!.expiresIn! < Date()) {
                    callback(Result.success(creds!))

                } else if (creds!.refreshToken != nil) {
                    Auth0
                        .authentication()
                        .logging(enabled: true)
                        .renew(withRefreshToken: creds!.refreshToken!)
                        .start(callback)
                } else {
                    callback(Result<Credentials>.failure(AuthenticationError(string: "Not logged in", statusCode: 0)))
                }
            } else {
                callback(Result<Credentials>.failure(AuthenticationError(string: err?.localizedDescription)))
            }
        }
        
    }
    
    public func logout() -> Void {
        Auth0
            .webAuth()
            .logging(enabled: true)
            .clearSession(federated: false) { result in
                if result {
                    // Session cleared
                }
            }
    }

    public func getUser(callback:  @escaping Request<UserInfo, AuthenticationError>.Callback) {
        credentialsManager.credentials { error, credentials in
            guard error == nil, let credentials = credentials else {
                // Handle error
                print("Error: \(String(describing: error))")
                callback(Result.failure(error!))
                return
            }
            // You now have a valid credentials object, you might want to store this locally for easy access.
            // You will use this later to retrieve the user's profile
            guard let accessToken = credentials.accessToken else {
                // Handle Error
                callback(Result.failure(error!))
                return
           }

            return Auth0
                .authentication()
                .logging(enabled: true)
                .userInfo(withAccessToken: accessToken)
                .start(callback)
        }
    }

}

