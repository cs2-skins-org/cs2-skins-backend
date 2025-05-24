import { Test, TestingModule } from '@nestjs/testing';
import { TradeItemsController } from './tradeitems.controller';
import { TradeItemsService } from './tradeitems.service';

describe('TradeitemsController', () => {
  let controller: TradeItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeItemsController],
      providers: [TradeItemsService],
    }).compile();

    controller = module.get<TradeItemsController>(TradeItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
