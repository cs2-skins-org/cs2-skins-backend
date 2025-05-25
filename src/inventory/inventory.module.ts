import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SkinInstance } from './entities/skininstance.entity';
import { Skin } from '../skin/entities/skin.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkinInstance, Skin, User])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
