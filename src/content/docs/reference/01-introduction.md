---
title: Introduction
description: Introduction to the API
---

The API exposes 5 simple endpoints:

- `GET /hosts/{hostId}/comments` to fetch all comments for a [**Host**](/docs/reference/02-core-concepts#host)
- `POST /hosts/{hostId}/comments` to create a comment for a [**Host**](/docs/reference/02-core-concepts#host)
- `PUT /hosts/{hostId}/comments/{id}` to modify a [**Comment**](/docs/reference/02-core-concepts#comment)
- `DELETE /hosts/{hostId}/comments/{id}` to delete a [**Comment**](/docs/reference/02-core-concepts#comment)
- `GET /consumers/{id}` to fetch a [**Consumer**](/docs/reference/02-core-concepts#consumer)

Read more about these endpoints in the [HTTP API](/docs/reference/04-http-api) section.

The application code adheres to the Ports and Adapters pattern, along with Command-Query Responsibility segregation.
It might seem overkill, but this helps in modifying the app to use whatever technologies you want with minimal effort.

As somewhat of a bonus, I have come to like this pattern quite a bit. I'm still learning so it won't be perfect, but it gets the job done!
