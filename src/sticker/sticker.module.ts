import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sticker } from './entities/sticker.entity';
import { StickerService } from './sticker.service';
import { StickerController } from './sticker.controller';

/**
 * Module responsible for managing stickers.
 * Includes database integration, controller, and service layer.
 */
@Module({
  /**
   * Imports the Sticker entity for TypeORM repository access.
   */
  imports: [TypeOrmModule.forFeature([Sticker])],

  /**
   * Provides the StickerService containing business logic.
   */
  providers: [StickerService],

  /**
   * Registers the StickerController for handling HTTP routes.
   */
  controllers: [StickerController],

  /**
   * Exports the service for use in other modules.
   */
  exports: [StickerService],
})
export class StickerModule {}
