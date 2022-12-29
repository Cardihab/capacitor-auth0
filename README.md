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
* [`handleRedirect()`](#handleredirect)
* [`renew()`](#renew)
* [`getUser()`](#getuser)
* [`getTokenSilently()`](#gettokensilently)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### createAuth0Client(...)

```typescript
createAuth0Client(options: { domain: string; clientId: string; authorizationParams: { redirect_uri: string; }; }) => Promise<void>
```

| Param         | Type                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ domain: string; clientId: string; authorizationParams: { redirect_uri: string; }; }</code> |

--------------------


### login(...)

```typescript
login(options: { scope: string; audience: string; appState?: string; redirect_uri?: string; }) => Promise<GetTokenSilentlyVerboseResponse>
```

| Param         | Type                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ scope: string; audience: string; appState?: string; redirect_uri?: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#gettokensilentlyverboseresponse">GetTokenSilentlyVerboseResponse</a>&gt;</code>

--------------------


### logout()

```typescript
logout() => Promise<void>
```

--------------------


### handleRedirect()

```typescript
handleRedirect() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### renew()

```typescript
renew() => Promise<GetTokenSilentlyVerboseResponse | undefined>
```

**Returns:** <code>Promise&lt;<a href="#gettokensilentlyverboseresponse">GetTokenSilentlyVerboseResponse</a>&gt;</code>

--------------------


### getUser()

```typescript
getUser() => Promise<{ [key: string]: any; }>
```

**Returns:** <code>Promise&lt;{ [key: string]: any; }&gt;</code>

--------------------


### getTokenSilently()

```typescript
getTokenSilently() => Promise<GetTokenSilentlyVerboseResponse | undefined>
```

**Returns:** <code>Promise&lt;<a href="#gettokensilentlyverboseresponse">GetTokenSilentlyVerboseResponse</a>&gt;</code>

--------------------


### Type Aliases


#### GetTokenSilentlyVerboseResponse

<code><a href="#omit">Omit</a>&lt;<a href="#tokenendpointresponse">TokenEndpointResponse</a>, 'refresh_token'&gt;</code>


#### Omit

Construct a type with the properties of T except for those in type K.

<code><a href="#pick">Pick</a>&lt;T, <a href="#exclude">Exclude</a>&lt;keyof T, K&gt;&gt;</code>


#### Pick

From T, pick a set of properties whose keys are in the union K

<code>{ [P in K]: T[P]; }</code>


#### Exclude

<a href="#exclude">Exclude</a> from T those types that are assignable to U

<code>T extends U ? never : T</code>


#### TokenEndpointResponse

<code>{ id_token: string; access_token: string; refresh_token?: string; expires_in: number; scope?: string; }</code>

</docgen-api>
