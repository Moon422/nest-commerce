import { Test, TestingModule } from '@nestjs/testing';
import { CacheKeyService } from './cache-key.service';

describe('CacheKeyService', () => {
  let service: CacheKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheKeyService],
    }).compile();

    service = module.get<CacheKeyService>(CacheKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
