import { Module } from '@nestjs/common';
import { TradeitemsService } from './tradeitems.service';
import { TradeitemsController } from './tradeitems.controller';

@Module({
  controllers: [TradeitemsController],
  providers: [TradeitemsService],
})
export class TradeitemsModule {}
