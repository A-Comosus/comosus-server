import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { AxiosService } from '@src/common';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, { provide: AxiosService, useValue: {} }],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should say server is up', async () => {
    expect(await service.getServerInfo()).toEqual({ status: 'Server is up' });
  });
});
