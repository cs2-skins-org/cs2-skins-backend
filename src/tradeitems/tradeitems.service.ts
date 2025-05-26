import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeItem } from './entities/tradeitem.entity';
import { CreateTradeItemDto } from './dto/create-tradeitem.dto';
import { UpdateTradeItemDto } from './dto/update-tradeitem.dto';
import { Trade } from '../trade/entities/trade.entity';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';

@Injectable()
export class TradeItemsService {
  constructor(
    @InjectRepository(TradeItem)
    private readonly repo: Repository<TradeItem>,
    @InjectRepository(Trade)
    private readonly tradeRepo: Repository<Trade>,
    @InjectRepository(SkinInstance)
    private readonly instanceRepo: Repository<SkinInstance>,
  ) {}

  async create(dto: CreateTradeItemDto) {
    const trade = await this.tradeRepo.findOneBy({ id: dto.trade });
    const skin_instance = await this.instanceRepo.findOneBy({ id: dto.skin_instance });

    const tradeItem = this.repo.create({
      ...dto,
      trade: trade ? { id: trade.id } : undefined,
      skin_instance: skin_instance ? { id: skin_instance.id } : undefined,
    });

    return this.repo.save(tradeItem);
  }

  findAll() {
    return this.repo.find({ relations: ['trade', 'skin_instance'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['trade', 'skin_instance'] });
  }

  async update(id: number, dto: UpdateTradeItemDto) {
    const updateData: any = { ...dto };

    if (dto.trade) {
      updateData.trade = await this.tradeRepo.findOneBy({ id: dto.trade });
    }

    if (dto.skin_instance) {
      updateData.skin_instance = await this.instanceRepo.findOneBy({ id: dto.skin_instance });
    }

    await this.repo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
