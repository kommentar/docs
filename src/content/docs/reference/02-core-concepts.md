---
title: Core Concepts
description: Core concepts of the application
---

Kommentar has some very simple yet useful concepts. They help me write code better, and hopefully will help you use Kommentar with ease as well.

:::note
All code blocks on this page are written in TypeScript.
:::

## Host

A **Host** is the parent of the [**Comment**](#comment).
A [**Comment**](#comment) cannot exist by itself. It _has_ to belong to a **Host**.

Consider these examples:

- On a blog site, each blog post is a separate **Host**.
- On GitHub, a PR, issue, or Discussion can be **Host**s.
- On a site like BlueSky, a post is a **Host**.
- On YouTube, a video is the **Host**.

Essentially, [**Comment**](#comment)s are scoped to a particular entity. This entity is what I prefer to call a **Host**.

A **Host** is identified by a unique identifier called the `hostId`.

Following the same examples:

- On a blog site, the blog post's slug could be the `hostId`
- On GitHub, the PR number could be the `hostId`
- On BlueSky, the post's ID could be the `hostId`
- On YouTube, the video's ID could be the `hostId`

Like I said earlier, it's nothing crazy. It's a very simple entity.

## Comment

A **Comment** is the entity that describes a comment made by a user on a [**Host**](#host).

It's defined as an object with some properties that allow you to manage them.

```typescript
type Comment = {
  id: string;
  content: string;
  hostId: string;
  createdAt: Date;
  updatedAt: Date;
  sessionId: string;
  commenter: Commenter;
};
```

You can look at the actual definition in the code [here](https://github.com/kommentar/kommentar/blob/main/src/app/domain/entities/comment.ts).

The model of a **Comment** is simple, and I do not expect it to change much in the future. If there are any changes, I will make sure to keep them backwards compatible.

## Commenter

A **Commenter** is the entity that describes the user who made a [**Comment**](#comment).

A **Commenter** cannot exist on it's own. It belongs to a [**Comment**](#comment).

Kommentar does not require you to authenticate users. As a commenting system that relies on the [**Host**](#host), I did not see the need to handle authentication in the application itself. If you choose to authenticate users, you can do so in your application and inject the user details into the `Commenter` object.

```typescript
type Commenter = {
  displayName: string;
  realName: string;
};
```

You can look at the actual definition in the code [here](https://github.com/kommentar/kommentar/blob/main/src/app/domain/entities/comment.ts).

## Consumer

A **Consumer** is the entity that consumes the Kommentar API. It can be a web application, a mobile app, or any other service that simply uses the API.

A **Consumer** is identified by a unique identifier. There is some level of granularity in how much access a particular **Consumer** has to the API, but it's nothing too complex.

:::note
You might ask yourself how this is "no authentication". The reason is that Kommentar does not require you to authenticate users. It only requires you to authenticate the application that is consuming the API.

This is done using an API key and secret that you can generate for each **Consumer**.
:::

```typescript
type Consumer = {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  apiSecret: string;
  allowedHosts: string[] | [];
  isActive: boolean;
  rateLimit: number; // The number of requests allowed per minute
};
```

You can look at the actual definition in the code [here](https://github.com/kommentar/kommentar/blob/main/src/app/domain/entities/consumer.ts).

## Super

A **Super** is essentially an admin user of the Kommentar application. It bypasses all restrictions and has access to all the data in the application.

Tehcnically speaking, a **Super** is not a domain entity in Kommentar. It's more of a user that has superuser privileges in the application.
