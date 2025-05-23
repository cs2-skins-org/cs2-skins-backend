import { PartialType } from '@nestjs/mapped-types';
import { CreateSkininstanceDto } from './create-skininstance.dto';

export class UpdateSkininstanceDto extends PartialType(CreateSkininstanceDto) {}
