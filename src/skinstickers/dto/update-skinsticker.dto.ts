import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinstickerDto } from './create-skinsticker.dto';

export class UpdateSkinstickerDto extends PartialType(CreateSkinstickerDto) {}
