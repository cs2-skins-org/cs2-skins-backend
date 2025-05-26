import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SkinStickersService } from './skinstickers.service';
import { CreateSkinStickerDto } from './dto/create-skinsticker.dto';
import { UpdateSkinStickerDto } from './dto/update-skinsticker.dto';

@Controller('skin-stickers')
export class SkinStickersController {
  constructor(private readonly service: SkinStickersService) {}

  @Post()
  create(@Body() dto: CreateSkinStickerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkinStickerDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
