import { Test, TestingModule } from '@nestjs/testing';
import { SkininstanceService } from './skininstance.service';

describe('SkininstanceService', () => {
  let service: SkininstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkininstanceService],
    }).compile();

    service = module.get<SkininstanceService>(SkininstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
