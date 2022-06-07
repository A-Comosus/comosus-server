import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from '../auth.resolver';
import { AuthService } from '../auth.service';
import mockUsers from './mockAuthData';

describe('AuthResolver should be...', () => {
  let resolver: AuthResolver;

  const mockAuthService = {
    login: jest.fn((user) => ({
      accessToken: Math.random().toString(36),
      user,
    })),
    register: jest.fn((registerInput) => ({
      ...registerInput,
      id: Math.random().toString(36),
      timeAcceptPolicy: new Date().toISOString(),
    })),
    forgetPasswordSendEmail: jest.fn(() => true),
    resetPassword: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('defined', () => {
    expect(resolver).toBeDefined();
  });

  it('able to login', async () => {
    const user = mockUsers[0];
    const { username, password } = user;
    expect(resolver.login({ username, password }, { user })).toEqual({
      accessToken: expect.any(String),
      user,
    });
  });

  it('able to register', async () => {
    const { email, username, password, acceptPolicy } = mockUsers[0];
    expect(
      resolver.register({ email, username, password, acceptPolicy }),
    ).toMatchObject({ id: expect.any(String) });
  });

  it('able to request password reset email', async () => {
    const { email } = mockUsers[0];
    expect(resolver.forgetPasswordSendEmail({ email })).toEqual(true);
  });

  it('able to reset password', async () => {
    const { passwordResetToken, password } = mockUsers[0];
    expect(
      resolver.resetPassword({ resetToken: passwordResetToken, password }),
    ).toEqual(true);
  });
});
