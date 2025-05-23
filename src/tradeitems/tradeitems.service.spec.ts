import { Test, TestingModule } from '@nestjs/testing';
import { TradeitemsService } from './tradeitems.service';

describe('TradeitemsService', () => {
  let service: TradeitemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeitemsService],
    }).compile();

    service = module.get<TradeitemsService>(TradeitemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
