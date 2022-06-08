import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { MailingService } from '@common';
import { UserService } from '@resource';
import { AuthService } from '../auth.service';
import mockUsers from './mockAuthData';

describe('AuthService should be...', () => {
  let service: AuthService;

  const mockUserService = {
    create: jest.fn(),
    findByUsername: jest.fn(),
    login: jest.fn(),
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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('able to validate user');
  it('able to login', async () => {
    const user = mockUsers[0];
    await expect(service.login(user)).resolves.toEqual({
      user,
    });
  });
  it.todo('able to register');
  it.todo('able to request password reset email');
});
