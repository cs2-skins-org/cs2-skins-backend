import { IsString } from 'class-validator';
import { StickerRarity } from '../entities/stickerrarity.enum';

/**
 * Data Transfer Object for creating a new sticker.
 */
export class CreateStickerDto {
  /**
   * Name of the sticker.
   */
  @IsString()
  name: string;

  /**
   * Rarity level of the sticker (e.g., common, rare).
   */
  @IsString()
  rarity: StickerRarity;

  /**
   * Path to the image representing the sticker.
   */
  @IsString()
  image_path: string;

  /**
   * Base price of the sticker.
   */
  price: number;
}
