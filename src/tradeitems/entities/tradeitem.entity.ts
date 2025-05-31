import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Trade } from '../../trade/entities/trade.entity';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';

/**
 * Enum representing which side of the trade the item belongs to.
 * - SENDER: Item is offered by the sender
 * - RECEIVER: Item is offered by the receiver
 */
export enum TradeSide {
  SENDER = 'sender',
  RECEIVER = 'receiver',
}

/**
 * Entity representing an item (skin instance) included in a trade.
 * Each TradeItem is linked to one trade and one skin instance.
 */
@Entity()
export class TradeItem {
  /**
   * Unique identifier for the trade item.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The trade this item belongs to.
   */
  @ManyToOne(() => Trade, { nullable: false })
  trade: Trade;

  /**
   * The skin instance being traded.
   */
  @ManyToOne(() => SkinInstance, { nullable: false })
  skin_instance: SkinInstance;

  /**
   * Indicates whether the item belongs to the sender or receiver in the trade.
   */
  @Column({
    type: 'enum',
    enum: TradeSide,
  })
  side: TradeSide;
}
