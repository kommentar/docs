---
title: Architecture
description: Kommentar's architecture and patterns
---

If you haven't already, I recommend reading the [Definitions](/docs/under-the-hood/01-definitions) page to understand the architecture and patterns used in Kommentar.

## Project Structure

Even though most people would not expect a project structure to be part of the architecture, I think it is important to mention it here.

The project is structured in a way that follows the Ports and Adapters pattern, with a clear separation of concerns.

- `app` - This directory contains the core application logic, domain models, and ports.
  - `domain` - This directory contains the domain models and business logic of the application.
    - `commands` - This directory contains the commands used in the application.
    - `queries` - This directory contains the queries used in the application.
    - `policies` - This directory contains the policies used in the application.
    - `entities` - This directory contains the domain entities of the application.
  - `driven-ports` - This directory contains the interfaces for the driven ports.
- `driven-adapters` - This directory contains the implementations of the driven ports.
- `driver-adapters` - This directory contains the implementations of the driving ports.

All the code in the `app` directory is free from any external dependencies. You can take a look for yourself and see that the code does not mention any specific framework or technology. This is by design, as the core application logic should be independent of any external systems.

## Flow of the Application

The flow of the application is quite simple and follows the Ports and Adapters pattern.

1. A request is made to the HTTP API (the driving port).
2. The HTTP API adapter receives the request and maps it to a command or query.
3. The command or query is passed to the core application logic, which processes it.
4. The core application logic interacts with the driven ports to perform the necessary operations, such as fetching or storing data.
5. The results are returned to the HTTP API adapter, which formats the response and sends it back to the client.

This flow allows for a clean separation of concerns, making it easy to modify or replace any part of the application without affecting the core logic.
