import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';
import { User } from '../users/entities/user.entity';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';

/**
 * Module that handles the marketplace feature, including
 * listing skins for sale and purchasing them.
 */
@Module({
  /**
   * Imports the necessary entities for database access.
   */
  imports: [TypeOrmModule.forFeature([SkinInstance, User])],

  /**
   * Registers the MarketplaceController to handle marketplace routes.
   */
  controllers: [MarketplaceController],

  /**
   * Provides the MarketplaceService for business logic.
   */
  providers: [MarketplaceService],
})
export class MarketplaceModule {}
