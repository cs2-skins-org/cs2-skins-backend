import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Trade } from '../trades/trade.entity';
import { SkinInstance } from '../skin-instances/skin-instance.entity';

@Entity()
export class TradeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trade, trade => trade.items)
  trade: Trade;

  @ManyToOne(() => SkinInstance)
  skin_instance: SkinInstance;
}
