import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from '../app.resolver';
import { AppService } from '../app.service';

describe('AppResolver', () => {
  let resolver: AppResolver;

  const mockAppService = {
    getServerInfo: jest.fn().mockReturnValue({ status: 'Server is up' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppResolver,
        { provide: AppService, useValue: mockAppService },
      ],
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return server info', async () => {
    expect(await resolver.getServerInfo()).toEqual({ status: 'Server is up' });
  });
});
