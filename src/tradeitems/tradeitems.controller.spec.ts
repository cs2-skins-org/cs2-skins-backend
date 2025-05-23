import { Test, TestingModule } from '@nestjs/testing';
import { TradeitemsController } from './tradeitems.controller';
import { TradeitemsService } from './tradeitems.service';

describe('TradeitemsController', () => {
  let controller: TradeitemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeitemsController],
      providers: [TradeitemsService],
    }).compile();

    controller = module.get<TradeitemsController>(TradeitemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
