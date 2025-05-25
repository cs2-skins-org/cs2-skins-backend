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

  @Post('bulk')
  createBulk(@Body() createSkinDtos: CreateSkinDto[]) {
    return this.skinService.createMany(createSkinDtos);
  }

  @Get('findAll')
  findAll() {
    return this.skinService.findAll();
  }

  @Get('findById/:id')
  findById(@Param('id') id: string) {
    return this.skinService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateSkinDto: UpdateSkinDto) {
    return this.skinService.update(+id, updateSkinDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.skinService.remove(+id);
  }

  @Get('searchSkinsByName/:name')
  findByName(@Param('name') name: string) {
    return this.skinService.findByName(name);
  }

}
