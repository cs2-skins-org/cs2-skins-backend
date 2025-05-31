import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

/**
 * Controller for handling trade-related operations.
 * Includes endpoints to create, retrieve, update, and delete trades.
 */
@Controller('trades')
export class TradeController {
  constructor(private readonly service: TradeService) {}

  /**
   * Creates a new trade between two users.
   *
   * @param dto - The trade creation data.
   * @returns The created Trade entity.
   */
  @Post()
  create(@Body() dto: CreateTradeDto) {
    return this.service.create(dto);
  }

  /**
   * Retrieves all trades in the system.
   *
   * @returns An array of Trade entities.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Retrieves a specific trade by its ID.
   *
   * @param id - The ID of the trade to retrieve.
   * @returns The matching Trade entity.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  /**
   * Updates a trade by its ID.
   *
   * @param id - The ID of the trade to update.
   * @param dto - The updated trade data.
   * @returns The updated Trade entity.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTradeDto) {
    return this.service.update(+id, dto);
  }

  /**
   * Deletes a trade by its ID.
   *
   * @param id - The ID of the trade to delete.
   * @returns The result of the deletion operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
