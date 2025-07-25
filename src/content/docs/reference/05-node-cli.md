---
title: Node CLI
description: Node CLI reference for Kommentar
---

Kommentar is primarily meant to be consumed via the HTTP API. Any SDKs that are published will also use the HTTP API under the hood.

That being said, I am aware that some functionalities available in the code are not exposed via the HTTP API _yet_. The main reason for this is that I have not yet worked out a decent but not-so-complex authorization strategy for these operations.

As a middle ground, I have created some scripts in the source code that you can use to execute these operations. The scripts are located in the [`scripts`](https://github.com/kommentar/kommentar/tree/main/scripts) directory, and you can run them using `pnpm`, the package manager used in this project.

The scripts can be run using the node scripts in the `package.json`, so you don't have to worry about making sure all the dependencies are initialized or anything like that.

:::note
The script at it's current state is a simple `.ts` file that uses Node's built-in functionalities to parse command line arguments. My aim is to enhance it in the future to provide a more user-friendly CLI experience. Think of it as a functional "work in progress" that will eventually evolve into a more robust CLI tool with autocompletion and a better UX in general.
:::

## Available Scripts

The following scripts are available:

- `pnpm manage`: This script is used to manage the [**Consumer**](/reference/02-core-concepts#consumer)s.
- `pnpm setup:admin`: This script is used to set up the admin user's API key and secret. This is a one-time setup script that you should run after deploying Kommentar for the first time.

There are other "dev" scripts that I created to help me do some stuff, but they don't really provide any value to you as a user of Kommentar. You can find them in the [`package.json`](https://github.com/kommentar/kommentar/tree/main/package.json) file if you want to have a look.

## Usage

There are two ways to execute the scripts in the [Available Scripts](#available-scripts) section:

1. **Using `pnpm`**: You can run the scripts directly using `pnpm`. For example, to manage consumers, you can run:
   ```bash
   pnpm manage
   ```
2. **Using `docker exec`**: If you are running Kommentar in a Docker container (as outlined in the [Deploy with Docker](/deploy/01-self-host#docker)), you can execute the scripts inside the container using `docker exec`. For example, to manage consumers, you can run:

   ```bash
   docker exec -it kommentar-app-1 pnpm manage
   ```

   :::note
   The name of the container may be different when you deploy, so make sure to run `docker ps` and use the correct name in place of `kommentar-app-1` if necessary.
   :::

   This will execute the `manage` script inside the Kommentar container. This is helpful if you want to make sure any changes in the database are synced with the container's environment, **especially if your environment for Docker is not the same as your local development environment.**

### `pnpm manage`

#### Script Arguments

Each command accepts specific arguments and options:

##### `create <name> [options]`

Creates a new consumer.

**Options:**

- `--description <desc>`: Optional description for the consumer.
- `--hosts <host1,host2>`: Comma-separated list of allowed hosts.
- `--rate-limit <number>`: Rate limit per minute (number).
- `--inactive`: Create the consumer as inactive.

**Example:**

```bash
pnpm manage create "My Blog" --description "Blog comment system" --hosts "blog.com,www.blog.com" --rate-limit 100
```

##### `list` or `ls`

Lists all consumers.

**Example:**

```bash
pnpm manage list
```

##### `show <id>`

Shows details for a specific consumer.

**Example:**

```bash
pnpm manage show <consumer-id>
```

##### `activate <id>`

Activates a consumer.

**Example:**

```bash
pnpm manage activate <consumer-id>
```

##### `deactivate <id>`

Deactivates a consumer.

**Example:**

```bash
pnpm manage deactivate <consumer-id>
```

##### `delete <id>`

Deletes a consumer.

**Example:**

```bash
pnpm manage delete <consumer-id>
```

### `pnpm setup:admin`

#### Script Arguments

This script does not accept any arguments. It is a one-time setup script that generates an API key and secret for the admin user.

The script will generate three things:

- An API key for the admin user.
- A hashed API secret for the admin user.
- An unhashed API secret for the admin user (this is printed to the console, so make sure to copy it somewhere safe).

The API key and the hashed API secret should be stored in the environment variables under the the keys `ADMIN_KEY` and `ADMIN_SECRET_HASH`, respectively. The unhashed API secret is the one you will need to pass in the `X-Admin-Secret` header when making admin requests to the Kommentar API.
