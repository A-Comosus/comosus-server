import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from '../auth.resolver';
import { AuthService } from '../auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  const mockAuthService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
