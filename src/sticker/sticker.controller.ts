import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { StickerService } from './sticker.service';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';

/**
 * Controller for managing sticker entities.
 * Provides routes for creating, retrieving, updating, and deleting stickers.
 */
@Controller('stickers')
export class StickerController {
  constructor(private readonly service: StickerService) {}

  /**
   * Creates multiple stickers in bulk.
   *
   * @param dtos - Array of DTOs defining sticker details.
   * @returns Array of created sticker entities.
   */
  @Post('bulkCreateStickers')
  createMany(@Body() dtos: CreateStickerDto[]) {
    return this.service.createMany(dtos);
  }

  /**
   * Retrieves all stickers from the database.
   *
   * @returns An array of all stickers.
   */
  @Get('getAllStickers')
  findAll() {
    return this.service.findAll();
  }

  /**
   * Retrieves a single sticker by its ID.
   *
   * @param id - The ID of the sticker.
   * @returns The matching sticker entity, if found.
   */
  @Get('findStickerById/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  /**
   * Searches for stickers by name (partial match).
   *
   * @param name - Name or partial name of the sticker.
   * @returns An array of matching stickers.
   */
  @Get('findStickerByName/:name')
  findStickerByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  /**
   * Updates a sticker by its ID.
   *
   * @param id - The ID of the sticker to update.
   * @param dto - DTO with updated sticker data.
   * @returns The updated sticker entity.
   */
  @Put('updateStickerById/:id')
  update(@Param('id') id: string, @Body() dto: UpdateStickerDto) {
    return this.service.update(+id, dto);
  }

  /**
   * Deletes a sticker by its ID.
   *
   * @param id - The ID of the sticker to remove.
   * @returns The result of the delete operation.
   */
  @Delete('removeStickerById/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
