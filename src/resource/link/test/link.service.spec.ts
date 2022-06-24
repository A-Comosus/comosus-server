import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService, AxiosService } from '@src/common';
import { LinkService } from '../link.service';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        { provide: PrismaService, useValue: {} },
        { provide: AxiosService, useValue: {} },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
