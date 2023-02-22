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

With the serverless variant of this application, you just need to have the right AWS credential to access the environment variables on the console.

### Starting the server locally

This serverless variant uses `serverless-offline`, simply run `yarn offline` to start the server

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
| Framework           | `nest`, `serverless`                                                           |
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
