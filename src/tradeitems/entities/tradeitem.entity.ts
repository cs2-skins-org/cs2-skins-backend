import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Trade } from '../../trade/entities/trade.entity';
import { Skininstance } from '../../skininstance/entities/skininstance.entity';

@Entity()
export class TradeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trade, trade => trade.items)
  trade: Trade;

  @ManyToOne(() => Skininstance)
  skin_instance: Skininstance;
}
