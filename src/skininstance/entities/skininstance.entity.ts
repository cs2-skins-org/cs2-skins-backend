import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,CreateDateColumn} from 'typeorm';
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

  @Column({
    type: 'enum',
    enum: Wear,
  })
  wear: Wear;

  @Column({ type: 'timestamp', nullable: true })
  trade_locked_until: Date;
}