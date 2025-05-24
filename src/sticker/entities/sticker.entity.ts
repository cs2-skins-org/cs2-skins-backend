import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SkinSticker } from '../../skinstickers/entities/skinsticker.entity';
import { StickerRarity } from './stickerrarity.enum';

@Entity()
export class Sticker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

   @Column({
    type: 'enum',
    enum: StickerRarity,
  })
  rarity: StickerRarity;

  @Column()
  image_path: string;

  @OneToMany(() => SkinSticker, (ss) => ss.sticker)
  appliedTo: SkinSticker[];
}
