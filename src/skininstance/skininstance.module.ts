import { Module } from '@nestjs/common';
import { SkininstanceService } from './skininstance.service';
import { SkininstanceController } from './skininstance.controller';

@Module({
  controllers: [SkininstanceController],
  providers: [SkininstanceService],
})
export class SkininstanceModule {}
