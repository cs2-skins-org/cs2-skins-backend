import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinInstance } from './entities/skininstance.entity';
import { SkinInstanceService } from './skininstance.service';
import { SkinInstanceController } from './skininstance.controller';
import { Skin } from '../skin/entities/skin.entity';
import { User } from '../users/entities/user.entity';

/**
 * Module responsible for managing skin instances.
 * Registers TypeORM entities, services, and controllers related to SkinInstance.
 */
@Module({
  /**
   * Imports TypeORM entities used in this module.
   */
  imports: [TypeOrmModule.forFeature([SkinInstance, Skin, User])],

  /**
   * Provides the SkinInstanceService for business logic.
   */
  providers: [SkinInstanceService],

  /**
   * Registers the controller that handles HTTP requests.
   */
  controllers: [SkinInstanceController],
})
export class SkinInstanceModule {}
