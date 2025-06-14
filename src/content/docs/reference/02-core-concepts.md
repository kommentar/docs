---
title: Core Concepts
description: Core concepts of the application
---

Kommentar has some very simple yet useful concepts. They help me write code better, and hopefully will help you use Kommentar with ease as well.

:::note
All code blocks on this page are written in TypeScript.
:::

### Host

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

### Comment

A **Comment** is the entity that describes a comment made by a user on a [**Host**](#host).

It's defined as an object with some properties that allow you to manage them.

```typescript
{
  /**
   * Unique identifier of the comment
   */
  id: string;
  /**
   * Content of the comment
   */
  content: string;
  /**
   * Unique identifier of the host, where the comment is placed (e.g. post, video, etc.)
   */
  hostId: string;
  /**
   * Date when the comment was created
   */
  createdAt: Date;
  /**
   * Date when the comment was last updated
   */
  updatedAt: Date;
  /**
   * Unique identifier of the session
   */
  sessionId: string;
  /**
   * Commenter details
   */
  commenter: Commenter;
}
```

You can look at the actual definition in the code [here](https://github.com/kommentar/kommentar/blob/main/src/app/domain/entities/comment.ts).

The model of a **Comment** is simple, and I do not expect it to change much in the future. If there are any changes, I will make sure to keep them backwards compatible.

### Commenter

A **Commenter** is the entity that describes the user who made a [**Comment**](#comment).

A **Commenter** cannot exist on it's own. It belongs to a [**Comment**](#comment).

Kommentar does not require you to authenticate users. As a commenting system that relies on the [**Host**](#host), I did not see the need to handle authentication in the application itself. If you choose to authenticate users, you can do so in your application and inject the user details into the `Commenter` object.

```typescript
{
  /**
   * Display name of the commenter
   * @example "safwanyp"
   */
  displayName: string;
  /**
   *
   * Real name of the commenter
   * @example "Safwan Parkar"
   */
  realName?: string;
}
```

You can look at the actual definition in the code [here](https://github.com/kommentar/kommentar/blob/main/src/app/domain/entities/comment.ts).
