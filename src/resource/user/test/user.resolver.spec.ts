import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import mockUserData from './mockUserData';

describe('UserResolver', () => {
  let resolver: UserResolver;

  const mockUserService = {
    findAll: jest.fn(() => mockUserData),
    findByUsername: jest.fn((_username: string) =>
      mockUserData.find(({ username }) => username === _username),
    ),
    findByEmail: jest.fn((email) =>
      mockUserData.find((user) => user.email === email),
    ),
    findByResetPasswordToken: jest.fn((passwordResetToken) =>
      mockUserData.find(
        (user) => user.passwordResetToken === passwordResetToken,
      ),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all user', async () => {
    expect(resolver.findAll()).toEqual(mockUserData);
  });

  it('should find user by username', async () => {
    const user = mockUserData[1];
    expect(resolver.findByUsername({ username: user.username })).toEqual(user);
  });

  it('should find user by email', async () => {
    const user = mockUserData[0];
    expect(resolver.findByEmail({ email: user.email })).toEqual(user);
  });

  it('should find user by resetPasswordToken', async () => {
    const user = mockUserData[0];
    expect(
      resolver.findByResetPasswordToken({
        resetPasswordToken: user.passwordResetToken,
      }),
    ).toEqual(user);
  });
});
