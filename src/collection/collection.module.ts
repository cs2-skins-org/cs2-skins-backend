import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';

/**
 * Module for managing skin collections.
 * 
 * Provides database access to the `Collection` entity,
 * and wires up the corresponding service and controller.
 */
@Module({
  /**
   * Imports the Collection entity for use with TypeORM.
   */
  imports: [TypeOrmModule.forFeature([Collection])],

  /**
   * Provides the CollectionService for dependency injection.
   */
  providers: [CollectionService],

  /**
   * Registers the CollectionController to handle incoming requests.
   */
  controllers: [CollectionController],

  /**
   * Exports the service so other modules can use it.
   */
  exports: [CollectionService],
})
export class CollectionModule {}
