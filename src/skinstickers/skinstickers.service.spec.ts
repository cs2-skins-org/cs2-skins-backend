import { Test, TestingModule } from '@nestjs/testing';
import { SkinstickersService } from './skinstickers.service';

describe('SkinstickersService', () => {
  let service: SkinstickersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkinstickersService],
    }).compile();

    service = module.get<SkinstickersService>(SkinstickersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
