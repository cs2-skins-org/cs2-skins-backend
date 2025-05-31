import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeItem } from './entities/tradeitem.entity';
import { CreateTradeItemDto } from './dto/create-tradeitem.dto';
import { UpdateTradeItemDto } from './dto/update-tradeitem.dto';
import { Trade } from '../trade/entities/trade.entity';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';

/**
 * Service responsible for managing trade item entities.
 * Handles creation, retrieval, update, and deletion of items within trades.
 */
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

  /**
   * Creates a new trade item entry.
   *
   * @param dto - Data to create a TradeItem.
   * @returns The created TradeItem entity.
   */
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

  /**
   * Retrieves all trade items with their associated trade and skin instance.
   *
   * @returns An array of TradeItem entities.
   */
  findAll() {
    return this.repo.find({ relations: ['trade', 'skin_instance'] });
  }

  /**
   * Retrieves a specific trade item by its ID.
   *
   * @param id - The ID of the trade item.
   * @returns The matching TradeItem entity.
   */
  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['trade', 'skin_instance'] });
  }

  /**
   * Updates an existing trade item by ID.
   *
   * @param id - The ID of the trade item to update.
   * @param dto - The new data to apply to the trade item.
   * @returns The updated TradeItem entity.
   */
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

  /**
   * Deletes a trade item by its ID.
   *
   * @param id - The ID of the trade item to delete.
   * @returns The result of the delete operation.
   */
  remove(id: number) {
    return this.repo.delete(id);
  }
}
