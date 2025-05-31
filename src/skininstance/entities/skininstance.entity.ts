import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Skin } from '../../skin/entities/skin.entity';
import { User } from '../../users/entities/user.entity';
import { Wear } from './wear.enum';

/**
 * Entity representing an individual owned instance of a skin.
 * Includes specific attributes such as float value, wear level,
 * custom name, trade status, and sale listing information.
 */
@Entity()
export class SkinInstance {
  /**
   * Unique identifier for the skin instance.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The base skin this instance is derived from.
   */
  @ManyToOne(() => Skin, { nullable: false })
  skin: Skin;

  /**
   * The user who currently owns this skin instance.
   */
  @ManyToOne(() => User, user => user.skinInstances)
  owner: User;

  /**
   * The float value determining wear and appearance (0.0–1.0).
   */
  @Column('float')
  float_value: number;

  /**
   * Whether this skin is a StatTrak variant.
   */
  @Column({ default: false })
  is_stattrak: boolean;

  /**
   * Whether this skin is a Souvenir variant.
   */
  @Column({ default: false })
  is_souvenir: boolean;

  /**
   * Indicates if this skin is currently listed for sale.
   */
  @Column({ default: false })
  is_listed_for_sale: boolean;

  /**
   * Indicates if this skin has been traded away by the user.
   */
  @Column({ default: false })
  is_traded_away: boolean;

  /**
   * Optional custom name assigned by the user.
   */
  @Column({ nullable: true })
  custom_name: string;

  /**
   * The wear level (Factory New, Battle-Scarred, etc.).
   */
  @Column({
    type: 'enum',
    enum: Wear,
  })
  wear: Wear;

  /**
   * Optional timestamp for when this item becomes tradable again.
   */
  @Column({ type: 'timestamp', nullable: true })
  trade_locked_until: Date;

  /**
   * Listing price if the skin is listed for sale.
   */
  @Column({ type: 'float', nullable: true })
  price: number | null;

  /**
   * Timestamp for when the skin instance was acquired.
   */
  @CreateDateColumn()
  acquired_at: Date;
}
