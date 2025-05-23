import { Test, TestingModule } from '@nestjs/testing';
import { SkininstanceController } from './skininstance.controller';
import { SkininstanceService } from './skininstance.service';

describe('SkininstanceController', () => {
  let controller: SkininstanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkininstanceController],
      providers: [SkininstanceService],
    }).compile();

    controller = module.get<SkininstanceController>(SkininstanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
