// Make sure the path is correct and the file exists; adjust the path if necessary
import { Wear } from '../../skininstance/entities/wear.enum';

export class CreateSkinInstanceDto {
  skin: number;
  owner: number;
  float_value: number;
  is_stattrak?: boolean;
  is_souvenir?: boolean;
  wear: Wear;
  trade_locked_until?: Date;
}
