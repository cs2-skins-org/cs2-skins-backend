import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradeitemsService } from './tradeitems.service';
import { CreateTradeitemDto } from './dto/create-tradeitem.dto';
import { UpdateTradeitemDto } from './dto/update-tradeitem.dto';

@Controller('tradeitems')
export class TradeitemsController {
  constructor(private readonly tradeitemsService: TradeitemsService) {}

  @Post()
  create(@Body() createTradeitemDto: CreateTradeitemDto) {
    return this.tradeitemsService.create(createTradeitemDto);
  }

  @Get()
  findAll() {
    return this.tradeitemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeitemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeitemDto: UpdateTradeitemDto) {
    return this.tradeitemsService.update(+id, updateTradeitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradeitemsService.remove(+id);
  }
}
