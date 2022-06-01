import * as supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';

const queryServerStatus = {
  query: `{
  server {
    status
  }
}`,
  response: {
    data: {
      server: {
        status: 'Server is up',
      },
    },
  },
};

describe('App Resolver', () => {
  let app: INestApplication;
  let request;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    request = supertest(app.getHttpServer()).post('/graphql');
  });

  it('should say server is up', () => {
    const { query, response } = queryServerStatus;
    return request.send({ query }).expect(response);
  });
});
