import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trade } from '../../trade/entities/trade.entity';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  steam_id: string;

  @Column({ nullable: true })
  profile_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Trade, (trade) => trade.sender)
  sentTrades: Trade[];

  @OneToMany(() => Trade, (trade) => trade.receiver)
  receivedTrades: Trade[];

  @OneToMany(() => SkinInstance, instance => instance.owner)
skinInstances: SkinInstance[];

}
