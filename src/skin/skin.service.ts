import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skin } from './entities/skin.entity';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { Collection } from '../collection/entities/collection.entity';

@Injectable()
export class SkinService {
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
  constructor(
    @InjectRepository(Skin)
    private skinRepo: Repository<Skin>,
    @InjectRepository(Collection)
    private collectionRepo: Repository<Collection>,
  ) {}

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


  findAll() {
    return this.skinRepo.find({ relations: ['collection'] });
  }

  findOne(id: number) {
    return this.skinRepo.findOne({ where: { id }, relations: ['collection'] });
  }

  async update(id: number, dto: UpdateSkinDto) {
    const updateData: any = { ...dto };

    if (dto.collection) {
      const collection = await this.collectionRepo.findOneBy({ id: dto.collection });
      updateData.collection = collection;
    }

    await this.skinRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.skinRepo.delete(id);
  }
}
