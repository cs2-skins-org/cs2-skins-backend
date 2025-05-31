import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { SkinSticker } from './entities/skinsticker.entity';
import { CreateSkinStickerDto } from './dto/create-skinsticker.dto';
import { UpdateSkinStickerDto } from './dto/update-skinsticker.dto';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';
import { Sticker } from '../sticker/entities/sticker.entity';

/**
 * Service that manages the relationship between stickers and skin instances.
 * Handles creation, update, retrieval, deletion, and search operations.
 */
@Injectable()
export class SkinStickersService {
  constructor(
    @InjectRepository(SkinSticker)
    private readonly repo: Repository<SkinSticker>,

    @InjectRepository(SkinInstance)
    private readonly skinInstanceRepo: Repository<SkinInstance>,

    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<Sticker>,
  ) {}

  /**
   * Creates a new skin-sticker mapping.
   *
   * @param dto - Data for the new mapping.
   * @returns The created SkinSticker entity.
   * @throws Error if the skin instance or sticker is not found.
   */
  async create(dto: CreateSkinStickerDto) {
    const skin_instance = await this.skinInstanceRepo.findOneBy({ id: dto.skin_instance });
    const sticker = await this.stickerRepo.findOneBy({ id: dto.sticker });

    if (!skin_instance) {
      throw new Error('SkinInstance not found');
    }
    if (!sticker) {
      throw new Error('Sticker not found');
    }

    const skinSticker = this.repo.create({
      ...dto,
      skin_instance,
      sticker,
    });

    return this.repo.save(skinSticker);
  }

  /**
   * Creates multiple skin-sticker mappings in bulk.
   *
   * @param dtos - Array of DTOs to create mappings.
   * @returns Array of created SkinSticker entities.
   * @throws Error if any referenced skin instance or sticker is not found.
   */
  async createMany(dtos: CreateSkinStickerDto[]) {
    const skinStickers = [];
    for (const dto of dtos) {
      const skin_instance = await this.skinInstanceRepo.findOneBy({ id: dto.skin_instance });
      const sticker = await this.stickerRepo.findOneBy({ id: dto.sticker });

      if (!skin_instance) {
        throw new Error('SkinInstance not found');
      }
      if (!sticker) {
        throw new Error('Sticker not found');
      }

      skinStickers.push(this.repo.create({
        ...dto,
        skin_instance,
        sticker,
      }));
    }
    return this.repo.save(skinStickers);
  }

  /**
   * Retrieves all skin-sticker entries with their relations.
   *
   * @returns An array of SkinSticker entities.
   */
  findAll() {
    return this.repo.find({ relations: ['skin_instance', 'sticker'] });
  }

  /**
   * Finds a specific skin-sticker entry by ID.
   *
   * @param id - The ID of the SkinSticker entry.
   * @returns The matching SkinSticker or null.
   */
  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['skin_instance', 'sticker'] });
  }

  /**
   * Updates a skin-sticker entry.
   *
   * @param id - The ID of the entry to update.
   * @param dto - The new data to apply.
   * @returns The updated SkinSticker entity.
   */
  async update(id: number, dto: UpdateSkinStickerDto) {
    const updateData: any = { ...dto };

    if (dto.skin_instance) {
      updateData.skin_instance = await this.skinInstanceRepo.findOneBy({ id: dto.skin_instance });
    }

    if (dto.sticker) {
      updateData.sticker = await this.stickerRepo.findOneBy({ id: dto.sticker });
    }

    await this.repo.update(id, updateData);
    return this.findOne(id);
  }

  /**
   * Deletes a skin-sticker entry by ID.
   *
   * @param id - The ID of the entry to delete.
   * @returns The result of the delete operation.
   */
  remove(id: number) {
    return this.repo.delete(id);
  }

  /**
   * Searches for skin-sticker entries by partial sticker name.
   *
   * @param name - Partial name of the sticker.
   * @returns Array of matching SkinSticker entries.
   */
  async findByStickerName(name: string): Promise<SkinSticker[]> {
    return this.repo.find({
      where: {
        sticker: {
          name: ILike(`%${name}%`)
        }
      },
      relations: ['skin_instance', 'sticker']
    });
  }
}
