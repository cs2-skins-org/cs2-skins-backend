import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinSticker } from './entities/skinsticker.entity';
import { SkinStickersService } from './skinstickers.service';
import { SkinStickersController } from './skinstickers.controller';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';
import { Sticker } from '../sticker/entities/sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkinSticker, SkinInstance, Sticker])],
  controllers: [SkinStickersController],
  providers: [SkinStickersService],
})
export class SkinStickersModule {}
