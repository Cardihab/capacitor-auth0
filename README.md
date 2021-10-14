# @cardihab/auth0-capacitor-plugin

Use native auth0 lock with capacitor

## Install

```bash
npm install @cardihab/auth0-capacitor-plugin
npx cap sync
```

## API

<docgen-index>

* [`createAuth0Client(...)`](#createauth0client)
* [`login(...)`](#login)
* [`logout()`](#logout)
* [`renew()`](#renew)
* [`getUser()`](#getuser)
* [`getTokenSilently()`](#gettokensilently)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### createAuth0Client(...)

```typescript
createAuth0Client(options: { domain: string; clientId: string; }) => Promise<void>
```

| Param         | Type                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ domain: string; clientId: string; }</code> |

--------------------


### login(...)

```typescript
login(client: { domain: string; clientId: string; }, options: { scope: string; audience: string; appState?: string; redirect_uri?: string; }) => Promise<{ accessToken: string; idToken: string; expiresIn: string; refreshToken: string; }>
```

| Param         | Type                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`client`**  | <code>{ domain: string; clientId: string; }</code>                                          |
| **`options`** | <code>{ scope: string; audience: string; appState?: string; redirect_uri?: string; }</code> |

**Returns:** <code>Promise&lt;{ accessToken: string; idToken: string; expiresIn: string; refreshToken: string; }&gt;</code>

--------------------


### logout()

```typescript
logout() => Promise<void>
```

--------------------


### renew()

```typescript
renew() => Promise<{ accessToken: string; idToken: string; expiresIn: string; refreshToken: string; }>
```

**Returns:** <code>Promise&lt;{ accessToken: string; idToken: string; expiresIn: string; refreshToken: string; }&gt;</code>

--------------------


### getUser()

```typescript
getUser() => Promise<{ [key: string]: any; }>
```

**Returns:** <code>Promise&lt;{ [key: string]: any; }&gt;</code>

--------------------


### getTokenSilently()

```typescript
getTokenSilently() => Promise<{ accessToken: string; idToken: string; expiresIn: string; refreshToken: string; }>
```

**Returns:** <code>Promise&lt;{ accessToken: string; idToken: string; expiresIn: string; refreshToken: string; }&gt;</code>

--------------------

</docgen-api>
