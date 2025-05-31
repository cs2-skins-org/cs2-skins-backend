import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SkinInstanceService } from './skininstance.service';
import { CreateSkinInstanceDto } from './dto/create-skininstance.dto';
import { UpdateSkinInstanceDto } from './dto/update-skininstance.dto';
import { SkinInstance } from './entities/skininstance.entity';

/**
 * Controller for managing skin instances.
 * Provides endpoints for creation, retrieval, update, and deletion.
 */
@Controller('skin-instances')
export class SkinInstanceController {
  constructor(private readonly skinInstanceService: SkinInstanceService) {}

  /**
   * Creates multiple skin instances in bulk.
   * 
   * @param dtos - Array of DTOs with skin instance data.
   * @returns Array of created skin instances.
   */
  @Post('bulkCreateSkinInstances')
  createMany(@Body() dtos: CreateSkinInstanceDto[]) {
    return this.skinInstanceService.createMany(dtos);
  }

  /**
   * Retrieves all skin instances.
   * 
   * @returns Promise resolving to an array of all skin instances.
   */
  @Get()
  findAll(): Promise<SkinInstance[]> {
    return this.skinInstanceService.findAll();
  }

  /**
   * Retrieves a single skin instance by its ID.
   * 
   * @param id - The ID of the skin instance.
   * @returns The matching skin instance or null if not found.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skinInstanceService.findOne(+id);
  }

  /**
   * Updates a skin instance by its ID.
   * 
   * @param id - The ID of the skin instance.
   * @param dto - DTO containing updated data.
   * @returns The updated skin instance.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkinInstanceDto) {
    return this.skinInstanceService.update(+id, dto);
  }

  /**
   * Deletes a skin instance by its ID.
   * 
   * @param id - The ID of the skin instance.
   * @returns Result of the delete operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skinInstanceService.remove(+id);
  }

  /**
   * Finds skin instances by the base skin's name.
   * 
   * @param name - The name of the base skin.
   * @returns An array of matching skin instances.
   */
  @Get('findByName/:name')
  findByName(@Param('name') name: string) {
    return this.skinInstanceService.findByName(name);
  }

  /**
   * Finds skin instances that belong to a specific collection.
   * 
   * @param id - The ID of the collection.
   * @returns An array of skin instances within the collection.
   */
  @Get('by-collection/:id')
  findByCollection(@Param('id') id: string) {
    return this.skinInstanceService.findByCollectionId(+id);
  }
}