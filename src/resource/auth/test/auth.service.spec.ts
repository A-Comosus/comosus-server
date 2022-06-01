import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UserService } from '@resource';
import { AuthService } from '../auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@src/resource/user/user.module';
import { JwtStrategy } from '../strategies';

describe('AuthService', () => {
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
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule,
        JwtModule.register({
          signOptions: { expiresIn: '60s' },
          secret: 'secret', // TODO: store this as environment variable
        }),
      ],
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        JwtStrategy,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
