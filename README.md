# Bolt CLI

## Installation

1. Clone repository
2. Install dependencies with `npm i`
3. Run `npm link`
4. Install CLI with `npm i -g bolt-cli`

## Usage

### Create

Run `bolt-cli create` to create a new app.

### Additional options

Use these CLI options to prepolulate fields:

| **Option**                             | **Description**                                        |
| -------------------------------------- | ------------------------------------------------------ |
|`-V, --version`                         | output the version number                              |
|`-n, --name <name>`                     | Project name                                           |
|`-a, --apis <apis>`                     | List of APIs (comma separated)                         |
|`-c, --components <components>`         | List of components (comma separated)                   |
|`-l, --language <language>`             | Programming language (Javascript, Typescript, Java)    |
|`-d, --dependencies <dependencies>`     | List of dependencies to be installed (comma separated) |
|`-t, --token <token>`                   | Slack app token                                        |
|`-s, --signing-secret <signing_secret>` | Slack app Signing Secret                               |
|`-h, --help`                            | display help for command                               |
