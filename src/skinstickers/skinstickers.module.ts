import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinSticker } from './entities/skinsticker.entity';
import { SkinStickersService } from './skinstickers.service';
import { SkinStickersController } from './skinstickers.controller';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';
import { Sticker } from '../sticker/entities/sticker.entity';

/**
 * Module for managing the relationship between skin instances and stickers.
 * Registers entities, controller, and service related to skin-sticker mappings.
 */
@Module({
  /**
   * Imports TypeORM entities used in this module.
   */
  imports: [TypeOrmModule.forFeature([SkinSticker, SkinInstance, Sticker])],

  /**
   * Registers the controller for handling HTTP requests.
   */
  controllers: [SkinStickersController],

  /**
   * Provides the service containing business logic.
   */
  providers: [SkinStickersService],
})
export class SkinStickersModule {}
