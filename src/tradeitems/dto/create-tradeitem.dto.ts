import { TradeSide } from '../entities/tradeitem.entity';

export class CreateTradeItemDto {
  trade: number; // trade ID
  skin_instance: number; // skinInstance ID
  side: TradeSide;
}
