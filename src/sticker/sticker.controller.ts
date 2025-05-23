import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { StickerService } from './sticker.service';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';

@Controller('stickers')
export class StickerController {
  constructor(private readonly service: StickerService) {}

  @Post()
  create(@Body() dto: CreateStickerDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateStickerDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
