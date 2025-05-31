import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { Trade } from './entities/trade.entity';
import { User } from '../users/entities/user.entity';

/**
 * Module responsible for managing trades between users.
 * Registers the trade entity, controller, and service.
 */
@Module({
  /**
   * Imports the Trade and User entities for TypeORM access.
   */
  imports: [TypeOrmModule.forFeature([Trade, User])],

  /**
   * Registers the controller that handles HTTP trade routes.
   */
  controllers: [TradeController],

  /**
   * Provides the business logic for handling trades.
   */
  providers: [TradeService],
})
export class TradeModule {}
