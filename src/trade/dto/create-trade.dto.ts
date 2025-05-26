import { IsNumber, IsString } from 'class-validator';

export class CreateTradeDto {
  @IsNumber()
  sender_id: number;

  @IsNumber()
  receiver_id: number;

  @IsString()
  status: string;

  sender?: number;
  receiver?: number;
}
