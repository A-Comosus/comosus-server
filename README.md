# 🍍 A-Comosus Server

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## What does your file structure looks like?

```js
/src // @src/*
  /common // @common | @common/*
  /config
  /resource // @resource | @resource/*
  /schema // "Code first" generated schema
  main.ts  //` App Entry Point
```

## 🏃‍♂️ How to run this server?

### Setting up development environment

TL;DR You need to set up following environment variables.

| name                   | description                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| PORT                   | The port for this server to listen to                                                                                            |
| NODE_ENV               | Environment this app will run within `development` \| `staging` \| `production`                                                  |
| CLIENT_BASE_URL        | The url to our front-end application, currently used for populating the email template with the correct url to direct users.     |
| \*DATABASE_URL         | The connection string to your database                                                                                           |
| \*CRYPTO_SECRET        | It's a secret 🤫                                                                                                                 |
| \*SENDGRID_API_KEY    | You probably need to ask your project manager for this, else create one on SendGrid and update the mailing service configuration |
| \*URL_META_AUTH_STRING | You need this env var to run a 3rd-party api to validate url and extract meta data for us                                        |
| \*LAMBDA_SEND_EMAIL_ENDPOINT | You need this env var to run the lambda send email function                                        |

At this stage, our `docker-compose.yml` is not ready yet, so please either find the database `DATABASE_URL` either by [setting it up yourself](https://www.mongodb.com/docs/atlas/getting-started/) or ask your project admin.

Once your atlas is created, create a `.env` file at project root directory and add you database connection string as `DATABASE_URL`

```js
DATABASE_URL = YOUR_CONNECTION_STRING;
```

### Starting the server

This project prefers using `yarn` as it's package manager.

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
$ yarn start
or
$ npm start

# Or run this to start the server in production mode
$ yarn run start:prod
$ npm run start:prod
```

## 🧪 How to write test for this server?

> #### TL;DR;
>
> Check existing test files to figure out what we are doing.
>
> - e2e test = `*.e2e-spec.ts`
> - unit test = `*.spec.ts`

We are using a rather different hierachy for this project, normally you would have all you tests sits in a `__test__` folder at the root directory. What we are doing here instead is each resource (or module) will have it's own test folder. Inside that test folder is where you will be writing your unit tests and integration tests. Without diving too far into this domain, there are 3 test file you MUST write for your feature.

Say you have a new feature named `user`, it has a `user.module.ts`, `user.resolver.ts` and `user.service.ts`.

### Unit tests 🍞🥩🥬🧀

You will want to wirte unit test for your `resolver` and `service` class, testing each of the functionality of their implementation. Unit test files need to be post-fixed with `*.spec.ts` for `jest` to recognise them properly.

### End-to-end Test 🍔 (or is this integration test? 🤔)

For your `user.module.ts`, you will want to write end-to-end test to mock a users's behaviour when accessing this feature. E2E test files need to be post-fixed with `*.e2e-spec.ts` for `jest` to recognise them properly.

### Still lost? Checkout these tutorials

- [NestJS Testing Tutorial | Unit and Integration Testing](https://www.youtube.com/watch?v=dXOfOgFFKuY)
- [NestJs | Testing](https://docs.nestjs.com/fundamentals/testing)

## ✅ How to run tests for this server?

```bash
# unit tests
yarn run test
yarn run test:watch   # enable watch mode
yarn run test:cov     # show coverage

# e2e tests
yarn run e2e
yarn run e2e:watch    # enable watch mode
yarn run e2e:cov      # show coverage

# run above commands with <file_name_regex> to filter the test file you want to run.
# e.g. I want to run just the user files
#     yarn run test:watch user
# e.g. I want to run just the service files
#     yarn run test:watch service.ts
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
