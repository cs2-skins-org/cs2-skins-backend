import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade, TradeStatus } from './entities/trade.entity';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { User } from '../users/entities/user.entity';

/**
 * Service responsible for handling trade-related operations,
 * including creation, retrieval, updating, and deletion of trades.
 */
@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepo: Repository<Trade>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Creates a new trade between two users.
   *
   * @param dto - Data required to create a trade.
   * @returns The created Trade entity.
   */
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

  /**
   * Retrieves all trades, including their relations (sender, receiver, and items).
   *
   * @returns An array of Trade entities.
   */
  findAll() {
    return this.tradeRepo.find({ relations: ['sender', 'receiver', 'items'] });
  }

  /**
   * Retrieves a specific trade by its ID, including relations.
   *
   * @param id - The ID of the trade.
   * @returns The matching Trade entity or null if not found.
   */
  findOne(id: number) {
    return this.tradeRepo.findOne({ where: { id }, relations: ['sender', 'receiver', 'items'] });
  }

  /**
   * Updates a trade with the given ID.
   *
   * @param id - The ID of the trade to update.
   * @param dto - Data to update in the trade.
   * @returns The updated Trade entity.
   */
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

  /**
   * Deletes a trade by its ID.
   *
   * @param id - The ID of the trade to delete.
   * @returns The result of the deletion operation.
   */
  remove(id: number) {
    return this.tradeRepo.delete(id);
  }
}
