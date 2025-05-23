import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Trade } from '../../trade/entities/trade.entity';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';

export enum TradeSide {
  SENDER = 'sender',
  RECEIVER = 'receiver',
}

@Entity()
export class TradeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trade, { nullable: false })
  trade: Trade;

  @ManyToOne(() => SkinInstance, { nullable: false })
  skin_instance: SkinInstance;

  @Column({
    type: 'enum',
    enum: TradeSide,
  })
  side: TradeSide;
}
