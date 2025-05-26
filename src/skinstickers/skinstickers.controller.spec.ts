import { Test, TestingModule } from '@nestjs/testing';
import { SkinStickersController } from './skinstickers.controller';
import { SkinStickersService } from './skinstickers.service';

describe('SkinstickersController', () => {
  let controller: SkinStickersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkinStickersController],
      providers: [SkinStickersService],
    }).compile();

    controller = module.get<SkinStickersController>(SkinStickersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
