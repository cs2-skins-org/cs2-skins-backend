import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkinSticker } from './entities/skinsticker.entity';
import { CreateSkinStickerDto } from './dto/create-skinsticker.dto';
import { UpdateSkinStickerDto } from './dto/update-skinsticker.dto';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';
import { Sticker } from '../sticker/entities/sticker.entity';

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

  findAll() {
    return this.repo.find({ relations: ['skin_instance', 'sticker'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['skin_instance', 'sticker'] });
  }

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

  remove(id: number) {
    return this.repo.delete(id);
  }
}
