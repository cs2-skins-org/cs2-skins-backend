import { IsString } from 'class-validator';
import { StickerRarity } from '../entities/stickerrarity.enum';

export class CreateStickerDto {
  @IsString()
  name: string;

  @IsString()
  rarity: StickerRarity;

  @IsString()
  image_path: string;
  
  price: number;
}
