import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';
import { Sticker } from '../../sticker/entities/sticker.entity';

/**
 * Entity representing a sticker applied to a specific skin instance.
 * A skin instance can have multiple stickers placed in different positions.
 */
@Entity()
export class SkinSticker {
  /**
   * Unique identifier for the skin-sticker relation.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The skin instance to which the sticker is applied.
   */
  @ManyToOne(() => SkinInstance, { nullable: false })
  skin_instance: SkinInstance;

  /**
   * The sticker that is applied to the skin.
   */
  @ManyToOne(() => Sticker, { nullable: false })
  sticker: Sticker;

  /**
   * The position of the sticker on the skin (typically between 0 and 3).
   */
  @Column()
  position: number;
}
