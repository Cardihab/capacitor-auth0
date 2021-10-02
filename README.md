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

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### createAuth0Client(...)

```typescript
createAuth0Client(options: { domain: string; clientId: string; }) => any
```

| Param         | Type                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ domain: string; clientId: string; }</code> |

**Returns:** <code>any</code>

--------------------


### login(...)

```typescript
login(options: { scope: string; audience: string; appState?: string; }) => any
```

| Param         | Type                                                                 |
| ------------- | -------------------------------------------------------------------- |
| **`options`** | <code>{ scope: string; audience: string; appState?: string; }</code> |

**Returns:** <code>any</code>

--------------------


### logout()

```typescript
logout() => any
```

**Returns:** <code>any</code>

--------------------


### renew()

```typescript
renew() => any
```

**Returns:** <code>any</code>

--------------------


### getUser()

```typescript
getUser() => any
```

**Returns:** <code>any</code>

--------------------

</docgen-api>
