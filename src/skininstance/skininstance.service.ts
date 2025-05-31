import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { SkinInstance } from './entities/skininstance.entity';
import { CreateSkinInstanceDto } from './dto/create-skininstance.dto';
import { UpdateSkinInstanceDto } from './dto/update-skininstance.dto';
import { Skin } from '../skin/entities/skin.entity';
import { User } from '../users/entities/user.entity';

/**
 * Service that handles operations related to SkinInstance entities.
 * Includes creation, retrieval, update, deletion, and querying by name or collection.
 */
@Injectable()
export class SkinInstanceService {
  constructor(
    @InjectRepository(SkinInstance)
    private skinInstanceRepo: Repository<SkinInstance>,

    @InjectRepository(Skin)
    private skinRepo: Repository<Skin>,

    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  /**
   * Creates a single skin instance with valid skin and owner references.
   *
   * @param dto - Data for creating the skin instance.
   * @returns The created SkinInstance entity.
   * @throws NotFoundException if skin or owner is not found.
   */
  async create(dto: CreateSkinInstanceDto): Promise<SkinInstance> {
    const skin = await this.skinRepo.findOneBy({ id: dto.skin });
    if (!skin) throw new NotFoundException('Skin not found');

    const owner = await this.userRepo.findOneBy({ id: dto.owner });
    if (!owner) throw new NotFoundException('Owner not found');

    const instance = this.skinInstanceRepo.create({
      ...dto,
      skin,
      owner,
    });
    return this.skinInstanceRepo.save(instance);
  }

  /**
   * Creates multiple skin instances in bulk.
   *
   * @param dtos - Array of DTOs to create skin instances.
   * @returns Array of created SkinInstance entities.
   * @throws NotFoundException if any skin or owner is not found.
   */
  async createMany(dtos: CreateSkinInstanceDto[]): Promise<SkinInstance[]> {
    const instances: SkinInstance[] = [];
    for (const dto of dtos) {
      const skin = await this.skinRepo.findOneBy({ id: dto.skin });
      if (!skin) throw new NotFoundException('Skin not found');

      const owner = await this.userRepo.findOneBy({ id: dto.owner });
      if (!owner) throw new NotFoundException('Owner not found');

      const instance = this.skinInstanceRepo.create({
        ...dto,
        skin,
        owner,
      });
      instances.push(instance);
    }
    return this.skinInstanceRepo.save(instances);
  }

  /**
   * Retrieves all skin instances, including skin and owner relations.
   *
   * @returns Promise resolving to an array of skin instances.
   */
  findAll(): Promise<SkinInstance[]> {
    return this.skinInstanceRepo.find({ relations: ['skin', 'owner'] });
  }

  /**
   * Retrieves a single skin instance by ID.
   *
   * @param id - ID of the skin instance.
   * @returns The matching SkinInstance or throws if not found.
   */
  async findOne(id: number): Promise<SkinInstance> {
    const instance = await this.skinInstanceRepo.findOne({
      where: { id },
      relations: ['skin', 'owner'],
    });
    if (!instance) throw new NotFoundException('Skin instance not found');
    return instance;
  }

  /**
   * Updates a skin instance by ID.
   *
   * @param id - ID of the skin instance to update.
   * @param dto - Data for updating the skin instance.
   * @returns The updated SkinInstance.
   * @throws NotFoundException if the skin instance, skin, or owner is not found.
   */
  async update(id: number, dto: UpdateSkinInstanceDto): Promise<SkinInstance> {
    const instance = await this.findOne(id);

    if (dto.skin) {
      const skin = await this.skinRepo.findOneBy({ id: dto.skin });
      if (!skin) throw new NotFoundException('Skin not found');
      instance.skin = skin;
    }

    if (dto.owner) {
      const owner = await this.userRepo.findOneBy({ id: dto.owner });
      if (!owner) throw new NotFoundException('Owner not found');
      instance.owner = owner;
    }

    Object.assign(instance, dto);
    return this.skinInstanceRepo.save(instance);
  }

  /**
   * Deletes a skin instance by ID.
   *
   * @param id - ID of the skin instance to remove.
   */
  async remove(id: number): Promise<void> {
    const instance = await this.findOne(id);
    await this.skinInstanceRepo.remove(instance);
  }

  /**
   * Finds skin instances where the base skin's name includes the search term.
   *
   * @param name - Partial or full name of the skin.
   * @returns Array of matching SkinInstance entities.
   */
  async findByName(name: string): Promise<SkinInstance[]> {
    return this.skinInstanceRepo.find({
      where: {
        skin: {
          name: ILike(`%${name}%`),
        },
      },
      relations: ['skin', 'owner'],
    });
  }

  /**
   * Finds skin instances belonging to a specific collection.
   *
   * @param collectionId - ID of the collection to filter by.
   * @returns Array of SkinInstance entities in the collection.
   */
  async findByCollectionId(collectionId: number): Promise<SkinInstance[]> {
    return this.skinInstanceRepo.find({
      relations: ['skin', 'skin.collection', 'owner'],
      where: {
        skin: {
          collection: {
            id: collectionId,
          },
        },
      },
    });
  }
}