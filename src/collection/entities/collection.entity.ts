import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Represents a collection entity, the collections being the skin collections in Counter Strike 2.
 */
@Entity()
export class Collection {
  /**
   * Unique identifier for the collection.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of the collection.
   */
  @Column()
  name: string;

  /**
   * Year the collection was released.
   */
  @Column()
  release_year: number;
}
