import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeItemsService } from './tradeitems.service';
import { TradeItemsController } from './tradeitems.controller';
import { TradeItem } from './entities/tradeitem.entity';
import { Trade } from '../trade/entities/trade.entity';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';

/**
 * Module responsible for managing trade item entities.
 * Registers the TradeItem entity, controller, and service,
 * and provides access to related entities like Trade and SkinInstance.
 */
@Module({
  /**
   * Imports TypeORM repositories for trade item and related entities.
   */
  imports: [TypeOrmModule.forFeature([TradeItem, Trade, SkinInstance])],

  /**
   * Registers the controller handling trade item routes.
   */
  controllers: [TradeItemsController],

  /**
   * Provides the service containing trade item business logic.
   */
  providers: [TradeItemsService],
})
export class TradeItemsModule {}
