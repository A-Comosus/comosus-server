import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@common';
import { UserService } from '../user.service';
import mockUserData from './mockUserData';

// @TODO: Update this test once the pr is merged

describe('UserService', () => {
  let userService: UserService;

  const mockPrismaClient = {
    user: {
      create: jest.fn(({ data }) =>
        Promise.resolve({ id: Math.random(), ...data }),
      ),
      findMany: jest.fn(() => mockUserData),
      findFirst: jest.fn(({ where: { username: _username } }) =>
        mockUserData.filter(({ username }) => username === _username),
      ),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaClient)
      .compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create user', async () => {
    const newUser = mockUserData[0];
    expect(await userService.create(newUser)).toEqual({
      id: expect.any(Number),
      ...newUser,
    });
  });

  it('should find all users', async () => {
    expect(await userService.findAll()).toBe(mockUserData);
  });

  it('should find users by username', async () => {
    const user = mockUserData[0];
    const input = user.username;
    const output = [user];

    expect(await userService.findByUsername(input)).toEqual(output);
  });
});
