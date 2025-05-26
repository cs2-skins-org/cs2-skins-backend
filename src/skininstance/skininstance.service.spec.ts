import { Test, TestingModule } from '@nestjs/testing';
import { SkinInstanceService } from './skininstance.service';

describe('SkininstanceService', () => {
  let service: SkinInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkinInstanceService],
    }).compile();

    service = module.get<SkinInstanceService>(SkinInstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
