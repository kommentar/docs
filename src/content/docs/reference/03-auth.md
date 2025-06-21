---
title: Authentication and Authorization
description: How Kommentar handles authentication and authorization
---

The primary goal of Kommentar is to be a commenting system. This means that by definition, Kommentar's domain does not include user management, authentication or authorization.

Kommentar is consumed by other application via an HTTP API, and these applications will more than likely have some form of user management, authentication and authorization. Kommentar does not enforce any specific user management system, but it does provide a way to authenticate users and authorize them to perform certain actions.

This part of the documentation will explain how Kommentar handles things like:

- Authentication of [**Consumers**](/docs/reference/02-core-concepts#consumer)
- Authorization of [**Consumers**](/docs/reference/02-core-concepts#consumer)
- User sessions
- Admin/Superuser access

## Authentication

Kommentar uses a simple API key based authentication system. Each [**Consumer**](/docs/reference/02-core-concepts#consumer) has a unique API key and secret that is used to authenticate requests. Here's how an example request might look like.

```shell
curl http://localhost:3000/hosts/e3251fe5-9401-4ee0-a15e-9b3a72ef4904/comments \
  --request POST \
  --header 'X-Api-Key: km_1234567890abcdef1234567890abcdef' \
  --header 'X-Api-Secret: abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab' \
  --header 'Content-Type: application/json' \
  --data '{
  "content": "This is a comment",
  "commenter": {
    "displayName": "safwanyp",
    "realName": "Safwan Parkar"
  }
}'
```

All API secrets are hashed before being stored, so even if the database is compromised, the API secrets are not exposed in plain text.

The API key however is stored in plain text. An API key alone is not enough to authenticate a request, it must be used in conjunction with the API secret.

:::danger
This should go without saying, but the API secret should be kept a secret. Even though the secret is hashed before being stored, it is absolutely critical that it be kept confidential. If you call the API directly from a client-facing application (like a web or mobile app), you should never expose the API secret in the client code. Instead, you should use a server-side proxy to handle the requests and keep the API secret safe.

The API key is something that is needed in conjuction with the API secret to authenticate requests. The API key is _technically_ not a secret and _can_ be exposed in client code. My recommendation, however, is to keep it confidential as well.
:::

## Authorization

Authorization in Kommentar is not too complex. Some might even say it is too simple to be considered authorization.

Kommentar does not have a concept of roles or permissions. Instead, it uses a simple allowlist approach. Each [**Consumer**](/docs/reference/02-core-concepts#consumer) is allowed to perform certain actions on certain resources.

To be more specific, each [**Consumer**](/docs/reference/02-core-concepts#consumer) is allowed to access and perform action only a specific list of [**Hosts**](/docs/reference/02-core-concepts#host). The granularity of this access is at the [**Host**](/docs/reference/02-core-concepts#host) level, and not at an operation level. If this does not make sense, have a gander at the example below.

### Example

```typescript
const allHosts = [
    "022dd2e0-70c1-49ae-95a5-04f87c35dd0d",
    "406f0cad-27f6-4e2f-a7b6-3273b429c13e",
    "e3251fe5-9401-4ee0-a15e-9b3a72ef4904"
];

const consumer: Consumer = {
  id: "474105c5-6534-4ca5-aa94-c8d449d6848d";
  name: "my-app";
  description: "An example application";
  apiKey: "km_1234567890abcdef1234567890abcdef";
  apiSecret: "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab";
  allowedHosts: ["022dd2e0-70c1-49ae-95a5-04f87c35dd0d", "406f0cad-27f6-4e2f-a7b6-3273b429c13e"];
  isActive: true;
  rateLimit: 400;
};
```

In this example, the `consumer` is allowed to access only the first two [**Hosts**](/docs/reference/02-core-concepts#host) in the `allHosts` array. If the `consumer` tries to access the third [**Host**](/docs/reference/02-core-concepts#host), the request will be rejected.

This also means that for the first two [**Hosts**](/docs/reference/02-core-concepts#host), the `consumer` can perform ANY action that is allowed by the API. This includes retrieving, posting, updating and deleting [**Comments**](/docs/reference/02-core-concepts#comment). There is no granularity in the actions that can be performed on a [**Host**](/docs/reference/02-core-concepts#host).

## User Sessions

Kommentar leverages the concept of user sessions, but it does not handle validation or management of these sessions.

The idea is that Kommentar will provide a way to associate a user session with a [**Comment**](/docs/reference/02-core-concepts#comment) when the comment is posted. This allows you to track which user made which comment, without Kommentar having to manage user sessions itself. There are drawbacks to this approach for sure, but it is a trade-off that I am willing to make for now. If enough people ask for a better solution, I will consider implementing a more robust system, but nothing to the extreme of a full-fledged user management system.

The user session in Kommentar is expected to be a `string`. No other enforcements are made on the format of the session ID. It is up to you to ensure that the session ID is unique and valid.

### How the Session ID is used

When a new [**Comment**](/docs/reference/02-core-concepts#comment) is created, the session ID is passed in the cookie header of the request. Kommentar will then associate the session ID with the [**Comment**](/docs/reference/02-core-concepts#comment) and store it.

When updating or deleting a [**Comment**](/docs/reference/02-core-concepts#comment), the session ID is also passed in the cookie header. Kommentar will then check if the session ID matches the one associated with the [**Comment**](/docs/reference/02-core-concepts#comment) and allow or deny the request accordingly.

Session IDs are not returned in any of the API responses to ensure that they are not exposed to the client. This is to prevent any potential security issues that could arise from exposing session IDs in the API responses. This does mean that you (a user of Kommentar) will have to use your own session management system to handle user sessions and ensure that the session ID is valid.

## Admin/Superuser Access

Kommentar has some operations that are reserved for admin or superuser access. These operations are available in the HTTP API, but they require specific headers to be set in the request.

These headers are:

- `X-Admin-Key`: The admin key that is used to authenticate the request.
- `X-Admin-Secret`: The admin secret that is used to authenticate the request.

These headers are not required for regular operations, and they are only used for admin operations. The admin key and secret are not stored in the database, and they are not exposed in any of the API responses.

The admin key and secret are stored as environment variables for now. This might change in the future, but for now this is the simplest way to handle admin access.
