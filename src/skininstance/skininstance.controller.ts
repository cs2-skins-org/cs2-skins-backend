import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkininstanceService } from './skininstance.service';
import { CreateSkininstanceDto } from './dto/create-skininstance.dto';
import { UpdateSkininstanceDto } from './dto/update-skininstance.dto';

@Controller('skininstance')
export class SkininstanceController {
  constructor(private readonly skininstanceService: SkininstanceService) {}

  @Post()
  create(@Body() createSkininstanceDto: CreateSkininstanceDto) {
    return this.skininstanceService.create(createSkininstanceDto);
  }

  @Get()
  findAll() {
    return this.skininstanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skininstanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkininstanceDto: UpdateSkininstanceDto) {
    return this.skininstanceService.update(+id, updateSkininstanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skininstanceService.remove(+id);
  }
}
