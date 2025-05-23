import { weapon_type } from '../entities/weapon-type.enum';

export class CreateSkinDto {
  name: string;
  weapon_type: weapon_type;
  rarity: string;
  image_path: string;
  collection: number; // this is the collection ID
  release_date: Date;
  base_price: number;
}

