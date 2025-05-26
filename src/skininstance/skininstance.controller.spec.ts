import { Test, TestingModule } from '@nestjs/testing';
import { SkinInstanceController } from './skininstance.controller';
import { SkinInstanceService } from './skininstance.service';

describe('SkininstanceController', () => {
  let controller: SkinInstanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkinInstanceController],
      providers: [SkinInstanceService],
    }).compile();

    controller = module.get<SkinInstanceController>(SkinInstanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
