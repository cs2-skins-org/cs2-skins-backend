import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TradeItem } from '../../tradeitems/entities/tradeitem.entity';
import { TradeStatus } from './tradestatus.enum';

/**
 * Entity representing a trade between two users.
 * A trade can include multiple items and go through various statuses.
 */
@Entity()
export class Trade {
  /**
   * Unique identifier for the trade.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The user who initiated the trade.
   */
  @ManyToOne(() => User, { nullable: false })
  sender: User;

  /**
   * The user who receives the trade request.
   */
  @ManyToOne(() => User, { nullable: false })
  receiver: User;

  /**
   * Current status of the trade (e.g., pending, accepted, declined).
   */
  @Column({
    type: 'enum',
    enum: TradeStatus,
    default: TradeStatus.PENDING,
  })
  status: TradeStatus;

  /**
   * Timestamp when the trade was created.
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  /**
   * Optional timestamp when the trade was completed.
   */
  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  /**
   * Items involved in this trade.
   */
  @OneToMany(() => TradeItem, (item) => item.trade)
  items: TradeItem[];
}

export { TradeStatus };
