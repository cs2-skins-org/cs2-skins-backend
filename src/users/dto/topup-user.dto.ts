import { IsNumber, IsPositive } from 'class-validator';

export class TopUpUserDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
