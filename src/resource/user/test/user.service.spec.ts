import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import mockUserData from './mockUserData';

describe('UserResolver', () => {
  let resolver: UserResolver;

  const mockUserService = {
    findAll: jest.fn(() => mockUserData),
    findByUsername: jest.fn((_username: string) =>
      mockUserData.filter(({ username }) => username === _username),
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
    const expectedResponse = [user];
    const username = user.username;
    expect(resolver.findByUsername({ username })).toEqual(expectedResponse);
  });
});
