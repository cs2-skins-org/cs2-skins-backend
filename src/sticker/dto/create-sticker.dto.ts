import { IsString } from 'class-validator';

export class CreateStickerDto {
  @IsString()
  name: string;

  @IsString()
  rarity: string;

  @IsString()
  image_path: string;
}
    