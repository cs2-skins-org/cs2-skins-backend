import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SkinSticker } from '../../skinstickers/entities/skinsticker.entity';
import { StickerRarity } from './stickerrarity.enum';

/**
 * Entity representing a sticker that can be applied to a skin instance.
 * Includes rarity, image path, and price.
 */
@Entity()
export class Sticker {
  /**
   * Unique identifier for the sticker.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of the sticker.
   */
  @Column()
  name: string;

  /**
   * Rarity level of the sticker.
   */
  @Column({
    type: 'enum',
    enum: StickerRarity,
  })
  rarity: StickerRarity;

  /**
   * Path to the image representing the sticker.
   */
  @Column()
  image_path: string;

  /**
   * Base price of the sticker.
   */
  @Column('float')
  price: number;

  /**
   * List of skin-sticker relationships where this sticker is applied.
   */
  @OneToMany(() => SkinSticker, (ss) => ss.sticker)
  appliedTo: SkinSticker[];
}
