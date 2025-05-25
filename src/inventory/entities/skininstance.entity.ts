import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Skin } from '../../skin/entities/skin.entity';

@Entity()
export class SkinInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Skin, { eager: true })
  skin: Skin;

  @ManyToOne(() => User, (user) => user.skinInstances, { eager: false })
  owner: User;

  @Column('float')
  float_value: number;

  @Column({ default: false })
  is_listed_for_sale: boolean;

  @Column({ default: false })
  is_traded_away: boolean;

  @Column({ nullable: true })
  custom_name: string;

  @CreateDateColumn()
  acquired_at: Date;
}
