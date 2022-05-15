# 🍍 A-Comosus Server

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 🏃‍♂️ How to run this server?

### Setting up development environment

At this stage, our `docker-compose.yml` is not ready yet, so please either find the database `CONNECTION_STRING` either by [setting it up yourself](https://www.mongodb.com/docs/atlas/getting-started/) or ask your project admin.

Once our `docker-compose.yml` is ready, you will be able to run

```bash
$ docker-compose up
```

and set the your `CONNECTION_STRING` to your local mongodb replica set, then you are good to go!

### Starting the server

This project prefers using `yarn` as it's package manager, but you can use `npm` or `pnpm` if you really want to.

```bash
# Installing dependencies
$ yarn

# Generate Prisma Client
$ yarn prisma generate

# Start the server in development mode with watch mode or...
$ yarn start:dev
 or
$ npm start:dev

# without watch mode
$ yarn start:dev
or
$ npm start:dev

# Or run this to start the server in production mode
$ yarn run start:prod
$ npm run start:prod
```

## ✅ How to run tests for this server?

```bash
# unit tests
$ yarn run test
$ npm run test

# e2e tests
$ yarn run test:e2e
$ npm run test:e2e

# test coverage
$ yarn run test:cov
$ npm run test:cov
```

## 🥞 What is your tech stack?

| Category            | Packages                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| Framework           | `nest`                                                                         |
| BootStrapper        | `@nestjs/cli`                                                                  |
| Scripting Language  | `typescript`                                                                   |
| Web API             | `graphql`, `@nestjs/graphql`                                                   |
| Database ORM Client | `prisma`, `prisma/client`                                                      |
| Encryption          | `bcrypt`                                                                       |
| Authentication      | `@nestjs/passport`, `passport`, `passport-local`,`@nestjs/jwt`, `passport-jwt` |
| Localisation        | `i18next`                                                                      |
| Validation          | `class-validator`,`class-transformer`                                          |
| Logging             |                                                                                |
| Testing             | `jest`, `supertest`                                                            |
| Code Control        | `eslint`, `prettier`, `eslint-plugin-prettier`                                 |
| CI/CD               | `GitHub Actions`                                                               |
| `undefined`         | `lodash`                                                                       |
