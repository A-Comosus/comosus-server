import { Test, TestingModule } from '@nestjs/testing';
import { LinkResolver } from '../link.resolver';
import { LinkService } from '../link.service';

describe('LinkResolver', () => {
  let resolver: LinkResolver;

  const mockLinkService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkResolver,
        { provide: LinkService, useValue: mockLinkService },
      ],
    }).compile();

    resolver = module.get<LinkResolver>(LinkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
