import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Collection } from '../../collection/entities/collection.entity';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';
import { weapon_type } from './weapon-type.enum';
import { rarity } from './rarity.enum';

/**
 * Entity representing a skin definition.
 * A skin can have multiple instances, belong to a collection,
 * and has attributes like weapon type, rarity, price, and release date.
 */
@Entity()
export class Skin {
  /**
   * Unique identifier for the skin.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of the skin.
   */
  @Column()
  name: string;

  /**
   * Type of weapon the skin belongs to (e.g., rifle, pistol).
   */
  @Column({
    type: 'enum',
    enum: weapon_type,
  })
  weapon_type: weapon_type;

  /**
   * Rarity level of the skin (e.g., common, legendary).
   */
  @Column({
    type: 'enum',
    enum: rarity,
  })
  rarity: rarity;

  /**
   * Path to the image file for this skin.
   */
  @Column()
  image_path: string;

  /**
   * The collection this skin is part of.
   */
  @ManyToOne(() => Collection, { nullable: false })
  collection: Collection;

  /**
   * Optional release date for the skin.
   */
  @Column({ type: 'timestamp', nullable: true })
  release_date: Date;

  /**
   * Base price of the skin (used as a reference, not listing price).
   */
  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  /**
   * All owned instances of this skin.
   */
  @OneToMany(() => SkinInstance, (instance) => instance.skin)
  instances: SkinInstance[];
}
