import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sticker } from './entities/sticker.entity';
import { StickerService } from './sticker.service';
import { StickerController } from './sticker.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sticker])],
  providers: [StickerService],
  controllers: [StickerController],
  exports: [StickerService],
})
export class StickerModule {}