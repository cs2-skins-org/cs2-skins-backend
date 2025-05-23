import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade, TradeStatus } from './entities/trade.entity';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepo: Repository<Trade>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateTradeDto) {
    const sender = await this.userRepo.findOneBy({ id: dto.sender });
    const receiver = await this.userRepo.findOneBy({ id: dto.receiver });

    const trade = this.tradeRepo.create({
      sender: { id: dto.sender } as User,
      receiver: { id: dto.receiver } as User,
      status: TradeStatus.PENDING,
    });

    return this.tradeRepo.save(trade);
  }

  findAll() {
    return this.tradeRepo.find({ relations: ['sender', 'receiver', 'items'] });
  }

  findOne(id: number) {
    return this.tradeRepo.findOne({ where: { id }, relations: ['sender', 'receiver', 'items'] });
  }

  async update(id: number, dto: UpdateTradeDto) {
    const updateData: any = { ...dto };
    if (dto.sender !== undefined) {
      updateData.sender = { id: dto.sender };
    }
    if (dto.receiver !== undefined) {
      updateData.receiver = { id: dto.receiver };
    }
    await this.tradeRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.tradeRepo.delete(id);
  }
}
