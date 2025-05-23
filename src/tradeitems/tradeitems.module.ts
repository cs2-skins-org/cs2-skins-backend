import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeItemsService } from './tradeitems.service';
import { TradeItemsController } from './tradeitems.controller';
import { TradeItem } from './entities/tradeitem.entity';
import { Trade } from '../trade/entities/trade.entity';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TradeItem, Trade, SkinInstance])],
  controllers: [TradeItemsController],
  providers: [TradeItemsService],
})
export class TradeItemsModule {}
