import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Sticker } from './entities/sticker.entity';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';

/**
 * Service responsible for managing sticker-related operations.
 * Handles CRUD operations and name-based searches.
 */
@Injectable()
export class StickerService {
  constructor(
    @InjectRepository(Sticker)
    private readonly repo: Repository<Sticker>,
  ) {}

  /**
   * Creates multiple stickers in bulk.
   *
   * @param dtos - Array of DTOs with sticker creation data.
   * @returns Array of saved sticker entities.
   */
  async createMany(dtos: CreateStickerDto[]) {
    const stickers = dtos.map(dto => this.repo.create(dto));
    return this.repo.save(stickers);
  }

  /**
   * Retrieves all stickers from the database.
   *
   * @returns An array of Sticker entities.
   */
  findAll() {
    return this.repo.find();
  }

  /**
   * Retrieves a sticker by its ID.
   *
   * @param id - The ID of the sticker.
   * @returns The matching Sticker entity or null if not found.
   */
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  /**
   * Searches for stickers by name (case-insensitive, partial match).
   *
   * @param name - Partial or full name of the sticker.
   * @returns An array of matching Sticker entities.
   */
  async findByName(name: string) {
    return this.repo.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  /**
   * Updates an existing sticker by its ID.
   *
   * @param id - The ID of the sticker to update.
   * @param dto - DTO containing updated fields.
   * @returns The updated Sticker entity.
   */
  async update(id: number, dto: UpdateStickerDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  /**
   * Deletes a sticker by its ID.
   *
   * @param id - The ID of the sticker to delete.
   * @returns The result of the delete operation.
   */
  remove(id: number) {
    return this.repo.delete(id);
  }
}
