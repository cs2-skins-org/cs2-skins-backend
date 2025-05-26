import { Test, TestingModule } from '@nestjs/testing';
import { SkinController } from './skin.controller';
import { SkinService } from './skin.service';

describe('SkinController', () => {
  let controller: SkinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkinController],
      providers: [SkinService],
    }).compile();

    controller = module.get<SkinController>(SkinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
