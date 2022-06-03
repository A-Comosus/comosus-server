import { Test, TestingModule } from '@nestjs/testing';
import { LinkResolver } from './link.resolver';
import { LinkService } from './link.service';

describe('LinkResolver', () => {
  let resolver: LinkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkResolver, LinkService],
    }).compile();

    resolver = module.get<LinkResolver>(LinkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
