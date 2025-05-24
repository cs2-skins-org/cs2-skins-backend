import { StickerRarity } from "../entities/stickerrarity.enum";

export class CreateStickerDto {
  name: string;
  rarity: StickerRarity;
  image_path: string;
}