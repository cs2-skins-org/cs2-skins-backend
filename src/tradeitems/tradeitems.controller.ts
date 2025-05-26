import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TradeItemsService } from './tradeitems.service';
import { CreateTradeItemDto } from './dto/create-tradeitem.dto';
import { UpdateTradeItemDto } from './dto/update-tradeitem.dto';

@Controller('trade-items')
export class TradeItemsController {
  constructor(private readonly service: TradeItemsService) {}

  @Post()
  create(@Body() dto: CreateTradeItemDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateTradeItemDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
