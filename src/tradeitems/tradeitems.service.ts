import { Injectable } from '@nestjs/common';
import { CreateTradeitemDto } from './dto/create-tradeitem.dto';
import { UpdateTradeitemDto } from './dto/update-tradeitem.dto';

@Injectable()
export class TradeitemsService {
  create(createTradeitemDto: CreateTradeitemDto) {
    return 'This action adds a new tradeitem';
  }

  findAll() {
    return `This action returns all tradeitems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tradeitem`;
  }

  update(id: number, updateTradeitemDto: UpdateTradeitemDto) {
    return `This action updates a #${id} tradeitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradeitem`;
  }
}
