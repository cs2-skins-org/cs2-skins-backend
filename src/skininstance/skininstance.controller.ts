import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SkinInstanceService } from './skininstance.service';
import { CreateSkinInstanceDto } from './dto/create-skininstance.dto';
import { UpdateSkinInstanceDto } from './dto/update-skininstance.dto';
import { SkinInstance } from './entities/skininstance.entity';

@Controller('skin-instances')
export class SkinInstanceController {
  constructor(private readonly skinInstanceService: SkinInstanceService) {}

  @Post('bulkCreateSkinInstances')
  createMany(@Body() dtos: CreateSkinInstanceDto[]) {
    return this.skinInstanceService.createMany(dtos);
  } 


  @Get()
  findAll(): Promise<SkinInstance[]> {
    return this.skinInstanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skinInstanceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkinInstanceDto) {
    return this.skinInstanceService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skinInstanceService.remove(+id);
  }
}