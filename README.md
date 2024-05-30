# Swetha C - Application Engineer task

## Introduction

Welcome Swetha, this repository is a smaller clone of our main repository at LEGO Octan. You'll find below documentation on working with and running Baby Octan. Spend some time in our [Getting started](#getting-started), [Contributing](CONTRIBUTING.md) & [Useful resources](useful-resources.md) sections to get up and running quickly.

Once getting the environment up and running, you will have a small working website that has a few simple pages for you to complete your task against.

Login information can be found hardcoded in our shared package [common/constants.js](packages/common/constants.js)

## The Task

For this exercise we have created a set of [issues](https://github.com/lego-shop/Swetha-C-task/issues) for you to complete. These issues test you adding new features and improve an existing codebase.

We aim for these tasks to take you no more than 3-4 hours. Submit your contributions to the repository.
# Baby Octan

![Image of Baby Yoda](https://i.imgur.com/Cgfk1B4.png)

- [What](#what)
- [Why](#why)
- [Getting started](#getting-started)
- [Troubleshooting](#troubleshooting)
- [Contributing](CONTRIBUTING.md)

## What

Is a repository that is meant to feel familiar with those working on Octan. Octan is one of our main repositories at LEGO; it is a monorepo which holds most of our hot-path for our lego.com experience. Including:

- lego.com Explore app
- lego.com Checkout app
- GraphQL Gateway
- Multiple Serverless framework Lambda's
- Component Library
- and 10s of other common modules

Baby Octan aim is to take away the initial pain of understanding Octan. It follows similar structures and technology choices; with cut back & simpler implementations.

## Why

The goal of Baby Octan is that adding a feature should feel very similar to adding one in Big Octan. So similar that you should be able to copy/paste it in; with some success.

This project will be useful for onboarding, training & recruitment.

Key choices core to the simplicity:

- Keeping build steps to a minimum
- GraphQL server is not using Babel or a bundler
- Un-typed JavaScript
- Minimal NextJS customization
- One environment, local development

## Getting started

Pre-requisites to working with the repository. You will need both Node & Yarn set-up.

- [Installing NodeJS](https://nodejs.org/en/download/)
- [Installing Yarn](https://yarnpkg.com/getting-started/install#global-install)

For more package specific help jump to a getting started in each package:

- [Getting started with Cypress](/packages/cypress#getting-started)
- [Getting started with App Shop](/packages/app-shop#getting-started)
- [Getting started with Graphql Gateway](/packages/graphql-gateway#getting-started)
- [Getting started with Service Products](/packages/service-products#getting-started)

### Running for development

To run have a working client running the full ecosystem will spin up everything you need using PM2. Both [app-shop](/packages/app-shop) & [graphql gateway](/packages/graphql-gateway) need to be running in order to get a fully working client. You can run them individually by going to each package and following their getting started section, or you can run `yarn dev:start` at the root that will get everything up and running for you.

```bash
# install dependencies and link internal packages to one another
yarn

# to start development
yarn dev:start

# to monitor
yarn dev:logs

# to stop
yarn dev:stop

# to stop and remove all apps from PM2
yarn dev:kill
```

You can also use the version of PM2 in the project via `yarn`

```bash
# Check status of apps
yarn pm2 list

# Get logs output of apps
yarn pm2 logs

# Stop and remove apps from PM2
yarn pm2 kill
```

### Linting & Formatting

```bash
# Running lint across all packages
yarn lint
```

There is a combination of Prettier and ESLint configured at the root of the monorepo. The current set up is mostly for developer experience rather than enforcing code guidelines.

Only React & Prettier have been included in the ESLint config:

- `eslint-plugin-react` extends ESLint to support JSX and we can fallback on some react best practices from `react/recommended`
- `eslint-config-prettier` stops all formatting rules from taking affect. So that ESLint does not collide with Prettier.

In Prettier we have:

- Rules to match other repositories at LEGO
- Included markdown support

## Troubleshooting

#### Modules / packages not resolving

Make sure to use `yarn` in the root of the project, as it will install and then link local packages as modules also.

The gateway application will not work without this.

#### PM2 not running

We've noticed in some Windows set-ups PM2 isn't running the developer environment, in this case the suggested work around is to run each `graphql-gateway` and then `app-shop` applications separately.

## Useful links

Each package also has a section of useful links:

- [App Shop](/packages/app-shop#useful-links)
- [Gateway](/packages/graphql-gateway#useful-links)
- [Service Products](/packages/service-products#useful-links)
- [Cypress](/packages/cypress#useful-links)

