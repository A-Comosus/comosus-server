import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

import { PrismaService, AxiosService } from '@common';
import { UserService } from '../user.service';
import mockUserData from './mockUserData';
import { UserStatus } from '@src/constants';

describe('UserService', () => {
  let userService: UserService;

  const mockPrismaClient = {
    user: {
      create: jest.fn(({ data }) =>
        Promise.resolve({ id: Math.random(), ...data }),
      ),
      findMany: jest.fn(() => mockUserData),
      findFirst: jest.fn(
        ({
          where: {
            username: _username,
            email: _email,
            passwordResetToken: _passwordResetToken,
          },
        }) =>
          mockUserData.find(
            ({ username, email, passwordResetToken }) =>
              username === _username ||
              email === _email ||
              passwordResetToken === _passwordResetToken,
          ),
      ),
      update: jest.fn(),
    },
  };

  const mockAxiosService = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaClient },
        ConfigService,
        { provide: AxiosService, useValue: mockAxiosService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create user', async () => {
    const newUser = mockUserData[0];
    expect(await userService.create(newUser)).toEqual({
      id: expect.any(Number),
      status: UserStatus.Registered,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      timeAcceptPolicy: expect.any(String),
      ...newUser,
    });
  });

  it('should find all users', async () => {
    expect(await userService.findAll()).toBe(mockUserData);
  });

  it('should find users by username', async () => {
    const user = mockUserData[0];
    expect(await userService.findByUsername(user.username)).toEqual(user);
  });

  it('should find user by email', async () => {
    const user = mockUserData[0];
    expect(await userService.findByEmail(user.email)).toEqual(user);
  });

  it('should find user by resetPasswordToken', async () => {
    const user = mockUserData[0];
    expect(
      await userService.findByResetPasswordToken(user.passwordResetToken),
    ).toEqual(user);
  });

  it('should create password reset link', async () => {
    const user = mockUserData[0];
    // @Note: We can't really test if the resetToken was actually generated, so we are just mocking this function so that it don't fail the test
    jest.spyOn(crypto, 'createHmac').mockImplementationOnce(() => {
      return {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn(),
      } as unknown as crypto.Hmac;
    });

    expect(await userService.createPasswordResetLink(user.id)).toContain(
      `${process.env.CLIENT_BASE_URL}/reset-password/`,
    );
  });
});
