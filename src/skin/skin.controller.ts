import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkinService } from './skin.service';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';

/**
 * Controller for managing skins.
 * Provides endpoints for creating, retrieving, updating, deleting, and searching skins.
 */
@Controller('skin')
export class SkinController {
  constructor(private readonly skinService: SkinService) {}

  /**
   * Creates a new skin.
   * 
   * @param createSkinDto - The skin data to create.
   * @returns The created skin.
   */
  @Post()
  create(@Body() createSkinDto: CreateSkinDto) {
    return this.skinService.create(createSkinDto);
  }

  /**
   * Creates multiple skins in bulk.
   * 
   * @param createSkinDtos - An array of skin data to create.
   * @returns The created skins.
   */
  @Post('bulk')
  createBulk(@Body() createSkinDtos: CreateSkinDto[]) {
    return this.skinService.createMany(createSkinDtos);
  }

  /**
   * Retrieves all skins.
   * 
   * @returns An array of all skin entities.
   */
  @Get('findAll')
  findAll() {
    return this.skinService.findAll();
  }

  /**
   * Retrieves a skin by its ID.
   * 
   * @param id - The ID of the skin to retrieve.
   * @returns The matching skin entity.
   */
  @Get('findById/:id')
  findById(@Param('id') id: string) {
    return this.skinService.findOne(+id);
  }

  /**
   * Updates a skin by its ID.
   * 
   * @param id - The ID of the skin to update.
   * @param updateSkinDto - The updated skin data.
   * @returns The updated skin entity.
   */
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateSkinDto: UpdateSkinDto) {
    return this.skinService.update(+id, updateSkinDto);
  }

  /**
   * Deletes a skin by its ID.
   * 
   * @param id - The ID of the skin to delete.
   * @returns The result of the delete operation.
   */
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.skinService.remove(+id);
  }

  /**
   * Searches for skins by name (case-insensitive, partial match).
   * 
   * @param name - The name or partial name of the skin.
   * @returns A list of matching skins.
   */
  @Get('searchSkinsByName/:name')
  findByName(@Param('name') name: string) {
    return this.skinService.findByName(name);
  }
}
