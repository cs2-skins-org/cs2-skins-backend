import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinInstance } from './entities/skininstance.entity';
import { SkinInstanceService } from './skininstance.service';
import { SkinInstanceController } from './skininstance.controller';
import { Skin } from '../skin/entities/skin.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkinInstance, Skin, User])],
  providers: [SkinInstanceService],
  controllers: [SkinInstanceController],
})
export class SkinInstanceModule {}