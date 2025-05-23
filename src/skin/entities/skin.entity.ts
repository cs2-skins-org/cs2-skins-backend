import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Collection } from '../../collection/entities/collection.entity';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';
import { weapon_type } from './weapon-type.enum';

@Entity()
@Entity()
export class Skin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: weapon_type,
  })
  weapon_type: weapon_type;

  @Column()
  rarity: string;

  @Column()
  image_path: string;

  @ManyToOne(() => Collection, { nullable: false })
  collection: Collection;

  @Column({ type: 'timestamp', nullable: true })
  release_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  @OneToMany(() => SkinInstance, (instance) => instance.skin)
  instances: SkinInstance[];
}
