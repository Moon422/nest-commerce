import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPasswordService } from './customer-password.service';

describe('CustomerPasswordService', () => {
  let service: CustomerPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerPasswordService],
    }).compile();

    service = module.get<CustomerPasswordService>(CustomerPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
