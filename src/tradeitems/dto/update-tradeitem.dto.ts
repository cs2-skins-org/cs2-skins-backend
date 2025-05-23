import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeitemDto } from './create-tradeitem.dto';

export class UpdateTradeitemDto extends PartialType(CreateTradeitemDto) {}
