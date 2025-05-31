import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

/**
 * Service that provides CRUD operations for the Collection entity.
 */
@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  /**
   * Creates and saves a new collection to the database.
   *
   * @param dto - The DTO containing collection creation data.
   * @returns The saved Collection entity.
   */
  create(dto: CreateCollectionDto) {
    const collection = this.collectionRepository.create(dto);
    return this.collectionRepository.save(collection);
  }

  /**
   * Retrieves all collections from the database.
   *
   * @returns An array of Collection entities.
   */
  findAll() {
    return this.collectionRepository.find();
  }

  /**
   * Finds a collection by its ID.
   *
   * @param id - The ID of the collection to retrieve.
   * @returns The matching Collection entity or null if not found.
   */
  findOne(id: number) {
    return this.collectionRepository.findOneBy({ id });
  }

  /**
   * Updates a collection with the given ID and data.
   *
   * @param id - The ID of the collection to update.
   * @param dto - The DTO containing the update data.
   * @returns The updated Collection entity.
   */
  async update(id: number, dto: UpdateCollectionDto) {
    await this.collectionRepository.update(id, dto);
    return this.findOne(id);
  }

  /**
   * Deletes a collection by its ID.
   *
   * @param id - The ID of the collection to delete.
   * @returns The result of the deletion operation.
   */
  remove(id: number) {
    return this.collectionRepository.delete(id);
  }
}
