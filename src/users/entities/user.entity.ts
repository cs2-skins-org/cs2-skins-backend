import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trade } from '../../trade/entities/trade.entity';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';

/**
 * The User entity represents a registered user in the system.
 * It holds user credentials, profile information, wallet balance,
 * and relationships to trades and owned skin instances.
 */
@Entity('users')
export class User {
  /** Primary key: Unique user ID */
  @PrimaryGeneratedColumn()
  id: number;

  /** Unique username used for login/display */
  @Column({ unique: true })
  username: string;

  /** Unique email address */
  @Column({ unique: true })
  email: string;

  /** Hashed password for authentication */
  @Column()
  password_hash: string;

  /** Optional Steam ID linked to the user's account */
  @Column({ nullable: true })
  steam_id: string;

  /** Optional URL to the user's Steam profile */
  @Column({ nullable: true })
  profile_url: string;

  /** Timestamp of when the user was created */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  /** Current balance of the user in their wallet */
  @Column({ type: 'double precision', default: 0 })
  balance: number;

  /** Trades sent by the user */
  @OneToMany(() => Trade, (trade) => trade.sender)
  sentTrades: Trade[];

  /** Trades received by the user */
  @OneToMany(() => Trade, (trade) => trade.receiver)
  receivedTrades: Trade[];

  /** Skin instances owned by the user */
  @OneToMany(() => SkinInstance, instance => instance.owner)
  skinInstances: SkinInstance[];
}
