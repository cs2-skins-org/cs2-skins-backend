import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SkinStickersService } from './skinstickers.service';
import { CreateSkinStickerDto } from './dto/create-skinsticker.dto';
import { UpdateSkinStickerDto } from './dto/update-skinsticker.dto';

/**
 * Controller for managing stickers applied to skin instances.
 * Supports CRUD operations and sticker-based queries.
 */
@Controller('skin-stickers')
export class SkinStickersController {
  constructor(private readonly service: SkinStickersService) {}

  /**
   * Creates multiple skin-sticker mappings in bulk.
   *
   * @param dtos - Array of DTOs defining the skin-sticker relationships.
   * @returns Array of created SkinSticker entries.
   */
  @Post('bulkSkinStickers')
  createMany(@Body() dtos: CreateSkinStickerDto[]) {
    return this.service.createMany(dtos);
  }

  /**
   * Retrieves all skin-sticker entries.
   *
   * @returns An array of SkinSticker entities.
   */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /**
   * Retrieves a specific skin-sticker entry by its ID.
   *
   * @param id - The ID of the skin-sticker entry.
   * @returns The matching SkinSticker entity.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  /**
   * Updates a specific skin-sticker entry by its ID.
   *
   * @param id - The ID of the skin-sticker entry to update.
   * @param dto - DTO with updated values.
   * @returns The updated SkinSticker entity.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkinStickerDto) {
    return this.service.update(+id, dto);
  }

  /**
   * Deletes a skin-sticker entry by its ID.
   *
   * @param id - The ID of the skin-sticker entry to delete.
   * @returns Result of the delete operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  /**
   * Searches skin-sticker entries by sticker name (partial match).
   *
   * @param name - The name of the sticker to search for.
   * @returns An array of SkinSticker entries with matching sticker names.
   */
  @Get('findByStickerName/:name')
  findByStickerName(@Param('name') name: string) {
    return this.service.findByStickerName(name);
  }
}
