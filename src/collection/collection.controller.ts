import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

/**
 * Controller for managing collection-related routes.
 */
@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  /**
   * Creates a new collection.
   * 
   * @param dto - The data transfer object containing collection details.
   * @returns The created collection.
   */
  @Post()
  create(@Body() dto: CreateCollectionDto) {
    return this.collectionService.create(dto);
  }

  /**
   * Retrieves all collections.
   * 
   * @returns An array of collections.
   */
  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  /**
   * Retrieves a single collection by its ID.
   * 
   * @param id - The ID of the collection to retrieve.
   * @returns The matching collection if found.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }

  /**
   * Updates an existing collection by its ID.
   * 
   * @param id - The ID of the collection to update.
   * @param dto - The updated collection data.
   * @returns The updated collection.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCollectionDto) {
    return this.collectionService.update(+id, dto);
  }

  /**
   * Deletes a collection by its ID.
   * 
   * @param id - The ID of the collection to delete.
   * @returns A success message or deletion result.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
