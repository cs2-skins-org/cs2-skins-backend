import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinService } from './skin.service';
import { SkinController } from './skin.controller';
import { Skin } from './entities/skin.entity';
import { Collection } from '../collection/entities/collection.entity';

/**
 * Module that handles all functionality related to skins,
 * including creation, retrieval, update, and deletion.
 */
@Module({
  /**
   * Imports the Skin and Collection entities for database access.
   */
  imports: [TypeOrmModule.forFeature([Skin, Collection])],

  /**
   * Registers the controller to expose RESTful endpoints for skins.
   */
  controllers: [SkinController],

  /**
   * Provides the SkinService for handling business logic.
   */
  providers: [SkinService],
})
export class SkinModule {}

