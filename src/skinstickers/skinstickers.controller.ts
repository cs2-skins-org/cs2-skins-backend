import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkinstickersService } from './skinstickers.service';
import { CreateSkinstickerDto } from './dto/create-skinsticker.dto';
import { UpdateSkinstickerDto } from './dto/update-skinsticker.dto';

@Controller('skinstickers')
export class SkinstickersController {
  constructor(private readonly skinstickersService: SkinstickersService) {}

  @Post()
  create(@Body() createSkinstickerDto: CreateSkinstickerDto) {
    return this.skinstickersService.create(createSkinstickerDto);
  }

  @Get()
  findAll() {
    return this.skinstickersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skinstickersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkinstickerDto: UpdateSkinstickerDto) {
    return this.skinstickersService.update(+id, updateSkinstickerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skinstickersService.remove(+id);
  }
}
