import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkinService } from './skin.service';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';

@Controller('skin')
export class SkinController {
  constructor(private readonly skinService: SkinService) {}

  @Post()
  create(@Body() createSkinDto: CreateSkinDto) {
    return this.skinService.create(createSkinDto);
  }

  @Get()
  findAll() {
    return this.skinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkinDto: UpdateSkinDto) {
    return this.skinService.update(+id, updateSkinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skinService.remove(+id);
  }
}
