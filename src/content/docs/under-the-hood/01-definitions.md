---
title: Definitions
description: Definitions for Kommentar's architecture and patterns
---

## Ports and Adapters Pattern

Kommentar is built using the Ports and Adapters pattern, also known as Hexagonal Architecture.
This pattern allows for a clean separation between the core application logic and the external systems it interacts with, such as databases, web servers, and APIs.
The architecture is designed to be modular and flexible, making it easy to adapt to different technologies and frameworks.

I won't go into the deep details of the architecture here but if you're interested in reading more about it, I recommend reading the book [Hexagonal Architecture Explained](https://alistaircockburn.company.site/Epub-Hexagonal-Architecture-Explained-Updated-1st-ed-p751233517) by Alistair Cockburn and Juan Manuel Garrido de Paz.

But to give you a high-level overview, here's what the architecture says:

- **Core**: This is the heart of the application, containing the business logic and domain models. It is independent of any external systems and can be tested in isolation.
- **Ports**: These are the interfaces through which the core interacts with the outside world. They define the operations that can be performed on the core, such as fetching comments or creating new ones. There are two types of ports:
  - **Driving Ports**: These are the interfaces that the core exposes to the outside world.
  - **Driven Ports**: These are the interfaces that the core uses to interact with external systems.
- **Adapters**: These are the implementations of the ports that interact with external systems. For example, there is an HTTP adapter, which allows the core to be accessed via HTTP requests.

## Policies

Kommentar also uses something called **Policies** to handle some functionality.

Policies can be considered as event handlers that are triggered by certain events in the application.

For example, when a comment is created, a policy can be triggered to send a notification to the commenter or perform some other action.
