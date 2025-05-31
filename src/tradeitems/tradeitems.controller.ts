import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TradeItemsService } from './tradeitems.service';
import { CreateTradeItemDto } from './dto/create-tradeitem.dto';
import { UpdateTradeItemDto } from './dto/update-tradeitem.dto';

/**
 * Controller for managing trade items.
 * Provides endpoints to create, retrieve, update, and delete trade item entries.
 */
@Controller('trade-items')
export class TradeItemsController {
  constructor(private readonly service: TradeItemsService) {}

  /**
   * Creates a new trade item.
   *
   * @param dto - The data for the trade item to be created.
   * @returns The created TradeItem entity.
   */
  @Post()
  create(@Body() dto: CreateTradeItemDto) {
    return this.service.create(dto);
  }

  /**
   * Retrieves all trade items.
   *
   * @returns An array of TradeItem entities.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Retrieves a specific trade item by ID.
   *
   * @param id - The ID of the trade item.
   * @returns The matching TradeItem entity.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  /**
   * Updates a trade item by ID.
   *
   * @param id - The ID of the trade item to update.
   * @param dto - The updated trade item data.
   * @returns The updated TradeItem entity.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTradeItemDto) {
    return this.service.update(+id, dto);
  }

  /**
   * Deletes a trade item by ID.
   *
   * @param id - The ID of the trade item to delete.
   * @returns The result of the deletion operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
