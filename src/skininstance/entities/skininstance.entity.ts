import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Skin } from '../../skin/entities/skin.entity';
import { User } from '../../users/entities/user.entity';
import { Wear } from './wear.enum';

@Entity()
export class SkinInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Skin, { nullable: false })
  skin: Skin;

  @ManyToOne(() => User, user => user.skinInstances)
  owner: User;

  @Column('float')
  float_value: number;

  @Column({ default: false })
  is_stattrak: boolean;

  @Column({ default: false })
  is_souvenir: boolean;

  @Column({ default: false })
  is_listed_for_sale: boolean;

  @Column({ default: false })
  is_traded_away: boolean;

  @Column({ nullable: true })
  custom_name: string;

  @Column({
    type: 'enum',
    enum: Wear,
  })
  wear: Wear;

  @Column({ type: 'timestamp', nullable: true })
  trade_locked_until: Date;

  @Column('float')
  price: number;

  @CreateDateColumn()
  acquired_at: Date;
}
