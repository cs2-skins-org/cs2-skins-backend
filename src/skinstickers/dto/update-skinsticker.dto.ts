import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinStickerDto } from './create-skinsticker.dto';

export class UpdateSkinStickerDto extends PartialType(CreateSkinStickerDto) {}
