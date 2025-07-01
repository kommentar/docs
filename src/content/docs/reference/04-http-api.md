---
title: HTTP API
description: HTTP API reference for Kommentar
---

Kommentar exposes a simple HTTP API.

- OpenAPI Specification: https://kommentar.dev/spec
- API Reference (UI): https://kommentar.dev/reference

To ensure consistency, I will not document the API here. Please use one of the above links to explore the API. I have tried to make it as detailed as possbile, including request and response examples, as well as error codes.

You might wonder why there are just 5 endpoints, and that wonder is valid. I plan to add more endpoints soon for some management features. Some of these management features are already implemented in the code, but not exposed via the API yet because I want to figure out a good authorization strategy for these operations first.

That being said, I have tried and included some node scripts to in the source code to help you execute these unexposed operations. You can find instructions on how to use them on the [Node CLI](/docs/reference/05-node-cli) page.
