import { IsNumber } from 'class-validator';

export class CreateTradeItemDto {
  @IsNumber()
  trade_id: number;

  @IsNumber()
  skin_instance_id: number;
}
    