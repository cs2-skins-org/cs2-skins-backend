import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
