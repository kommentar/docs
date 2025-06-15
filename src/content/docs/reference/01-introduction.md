---
title: Introduction
description: Introduction to the API
---

The API exposes 4 simple endpoints:

- `GET /comments/:hostId` to fetch all comments for a [**Host**](/docs/reference/02-core-concepts/#host)
- `POST /comments/:hostId` to create a comment for a [**Host**](/docs/reference/02-core-concepts/#host)
- `PUT /comments/:id` to modify a comment
- `DELETE /comments/:id` to delete a comment

The application code adheres to the Ports and Adapters pattern, along with Command-Query Responsibility segregation.
It might seem overkill, but this helps in modifying the app to use whatever technologies you want with minimal effort.

As somewhat of a bonus, I have come to like this pattern quite a bit. I'm still learning so it won't be perfect, but it gets the job done!
