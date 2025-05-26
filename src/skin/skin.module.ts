import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinService } from './skin.service';
import { SkinController } from './skin.controller';
import { Skin } from './entities/skin.entity';
import { Collection } from '../collection/entities/collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skin, Collection])],
  controllers: [SkinController],
  providers: [SkinService],
})
export class SkinModule {}

