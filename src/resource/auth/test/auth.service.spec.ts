import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { MailingService, AxiosService } from '@src/common';
import { UserService } from '@resource';
import { AuthService } from '../auth.service';
import { mockUsers } from './mockAuthData';

describe('AuthService should be...', () => {
  let service: AuthService;

  const mockUserService = {
    create: jest.fn((createUserInput) => {
      return {
        ...createUserInput,
        id: Math.random().toString(36),
        timeAcceptPolicy: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }),
    findByUsername: jest.fn((username) => {
      return mockUsers.find((user) => user.username === username);
    }),
    login: jest.fn(),
    findByEmail: jest.fn(),
    register: jest.fn(),
    forgetPasswordSendEmail: jest.fn(),
    resetPassword: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn(),
  };
  const mockMailingService = {
    sendEmail: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: MailingService, useValue: mockMailingService },
        { provide: AxiosService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('able to validate user');

  it.todo('able to login');

  it('able to register', async () => {
    const registerInput = {
      email: 'email@example.com',
      username: 'username',
      password: 'secret',
      acceptPolicy: true,
    };
    expect(await service.register(registerInput)).toMatchObject({
      id: expect.any(String),
    });
  });
});
