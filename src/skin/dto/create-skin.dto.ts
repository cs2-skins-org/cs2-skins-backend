import { weapon_type } from '../entities/weapon-type.enum';
import { rarity } from '../entities/rarity.enum';

export class CreateSkinDto {
  name: string;
  weapon_type: weapon_type;
  rarity: rarity; // ✅ change from string to rarity enum
  image_path: string;
  collection: number; // collection ID
  release_date: Date;
  base_price: number;
}
