import { Wear } from '../entities/wear.enum';

export class CreateSkinInstanceDto {
  skin: number;
  owner: number;
  float_value: number;
  is_stattrak?: boolean;
  is_souvenir?: boolean;
  is_listed_for_sale?: boolean;
  is_traded_away?: boolean;
  custom_name?: string;
  wear: Wear;
  trade_locked_until?: Date;
  price: number;
}