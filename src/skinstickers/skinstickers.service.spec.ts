import { Test, TestingModule } from '@nestjs/testing';
import { SkinStickersService } from './skinstickers.service';

describe('SkinstickersService', () => {
  let service: SkinStickersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkinStickersService],
    }).compile();

    service = module.get<SkinStickersService>(SkinStickersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
