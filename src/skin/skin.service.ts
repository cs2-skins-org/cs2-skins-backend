import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skin } from './entities/skin.entity';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { Collection } from '../collection/entities/collection.entity';

/**
 * Service responsible for managing Skin entities.
 * Handles creation, retrieval, update, deletion, and search operations.
 */
@Injectable()
export class SkinService {
  constructor(
    @InjectRepository(Skin)
    private skinRepo: Repository<Skin>,
    @InjectRepository(Collection)
    private collectionRepo: Repository<Collection>,
  ) {}

  /**
   * Creates a single skin entry.
   *
   * @param dto - Data transfer object containing the skin's details.
   * @returns The created Skin entity.
   * @throws Error if the associated collection is not found.
   */
  async create(dto: CreateSkinDto) {
    const collection = await this.collectionRepo.findOneBy({ id: dto.collection });
    if (!collection) {
      throw new Error('Collection not found');
    }

    const skin = this.skinRepo.create({
      ...dto,
      collection,
      weapon_type: dto.weapon_type,
      rarity: dto.rarity,
    });

    return this.skinRepo.save(skin);
  }

  /**
   * Creates multiple skins in a batch operation.
   *
   * @param createSkinDtos - Array of DTOs with skin creation data.
   * @returns An array of created Skin entities.
   * Skips skins with invalid collection references.
   */
  async createMany(createSkinDtos: CreateSkinDto[]) {
    const skins: Skin[] = [];

    for (const dto of createSkinDtos) {
      const collection = await this.collectionRepo.findOneBy({ id: dto.collection });
      if (!collection) {
        console.warn(`Collection with ID ${dto.collection} not found. Skipping skin "${dto.name}".`);
        continue;
      }

      const skin = this.skinRepo.create({
        ...dto,
        collection,
        weapon_type: dto.weapon_type,
        rarity: dto.rarity,
      });

      skins.push(skin);
    }

    return this.skinRepo.save(skins);
  }

  /**
   * Retrieves all skins, including their associated collections.
   *
   * @returns An array of Skin entities with collection relations.
   */
  findAll() {
    return this.skinRepo.find({ relations: ['collection'] });
  }

  /**
   * Retrieves a single skin by its ID.
   *
   * @param id - The ID of the skin to retrieve.
   * @returns The matching Skin entity or null if not found.
   */
  findOne(id: number) {
    return this.skinRepo.findOne({ where: { id }, relations: ['collection'] });
  }

  /**
   * Updates a skin entry by ID.
   *
   * @param id - The ID of the skin to update.
   * @param dto - The DTO containing updated skin data.
   * @returns The updated Skin entity.
   */
  async update(id: number, dto: UpdateSkinDto) {
    const updateData: any = { ...dto };

    if (dto.collection) {
      const collection = await this.collectionRepo.findOneBy({ id: dto.collection });
      updateData.collection = collection;
    }

    await this.skinRepo.update(id, updateData);
    return this.findOne(id);
  }

  /**
   * Deletes a skin by its ID.
   *
   * @param id - The ID of the skin to delete.
   * @returns The result of the delete operation.
   */
  remove(id: number) {
    return this.skinRepo.delete(id);
  }

  /**
   * Searches for skins by exact name match.
   *
   * @param name - The name of the skin to search for.
   * @returns An array of matching Skin entities.
   */
  async findByName(name: string) {
    return this.skinRepo.find({
      where: {
        name: name,
      },
      relations: ['collection'],
    });
  }
}

