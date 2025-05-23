import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SkinSticker } from '../../skinstickers/entities/skinsticker.entity';

@Entity()
export class Sticker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rarity: string;

  @Column()
  image_path: string;

  @OneToMany(() => SkinSticker, (ss) => ss.sticker)
  appliedTo: SkinSticker[];
}
