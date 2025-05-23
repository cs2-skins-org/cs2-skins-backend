import { PartialType } from '@nestjs/mapped-types';
import { CreateTradeItemDto } from './create-tradeitem.dto';

export class UpdateTradeItemDto extends PartialType(CreateTradeItemDto) {}
