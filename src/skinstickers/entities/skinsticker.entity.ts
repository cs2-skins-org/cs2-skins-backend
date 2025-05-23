import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SkinInstance } from '../../skininstance/entities/skininstance.entity';
import { Sticker } from '../../sticker/entities/sticker.entity';

@Entity()
export class SkinSticker {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SkinInstance, { nullable: false })
  skin_instance: SkinInstance;

  @ManyToOne(() => Sticker, { nullable: false })
  sticker: Sticker;

  @Column()
  position: number; // Typically 0–3
}
