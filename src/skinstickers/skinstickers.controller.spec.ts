import { Test, TestingModule } from '@nestjs/testing';
import { SkinstickersController } from './skinstickers.controller';
import { SkinstickersService } from './skinstickers.service';

describe('SkinstickersController', () => {
  let controller: SkinstickersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkinstickersController],
      providers: [SkinstickersService],
    }).compile();

    controller = module.get<SkinstickersController>(SkinstickersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
