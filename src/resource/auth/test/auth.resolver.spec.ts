import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from '../auth.resolver';
import { AuthService } from '../auth.service';

describe('AuthResolver should be...', () => {
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

  it('defined', () => {
    expect(resolver).toBeDefined();
  });

  it.todo('able to login');
  it.todo('able to register');
  it.todo('able to request password reset email ');
});
