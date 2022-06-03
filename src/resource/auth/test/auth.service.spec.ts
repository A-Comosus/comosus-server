import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@resource';
import { AuthService } from '../auth.service';

describe('AuthService should be...', () => {
  let service: AuthService;

  const mockUserService = {
    create: jest.fn(),
    findByUsername: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('able to validate user');
  it.todo('able to login');
  it.todo('able to register');
  it.todo('able to request password reset email');
});
