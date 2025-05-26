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

  @Get('getAllStickers')
  findAll() {
    return this.service.findAll();
  }

  @Get('findStickerById/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('findStickerByName/:name')
  findStickerByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  @Put('updateStickerById/:id')
  update(@Param('id') id: string, @Body() dto: UpdateStickerDto) {
    return this.service.update(+id, dto);
  }

  @Delete('removeStickerById/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
