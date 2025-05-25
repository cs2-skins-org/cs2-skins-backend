import { PartialType } from '@nestjs/mapped-types';
import { CreateSkinInstanceDto } from './create-skininstance.dto';

export class UpdateSkinInstanceDto extends PartialType(CreateSkinInstanceDto) {}