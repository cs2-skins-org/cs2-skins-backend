import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkinInstance } from './entities/skininstance.entity';
import { CreateSkinInstanceDto } from './dto/create-skininstance.dto';
import { UpdateSkinInstanceDto } from './dto/update-skininstance.dto';
import { Skin } from '../skin/entities/skin.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SkinInstanceService {
  constructor(
    @InjectRepository(SkinInstance)
    private readonly instanceRepo: Repository<SkinInstance>,
    @InjectRepository(Skin)
    private readonly skinRepo: Repository<Skin>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateSkinInstanceDto) {
    const skin = await this.skinRepo.findOneBy({ id: dto.skin });
    const owner = await this.userRepo.findOneBy({ id: dto.owner });

    const instance = this.instanceRepo.create({
      ...dto,
      skin: skin ? skin : undefined,
      owner: owner ? owner : undefined,
    });

    return this.instanceRepo.save(instance);
  }

  findAll() {
    return this.instanceRepo.find({ relations: ['skin', 'owner'] });
  }

  findOne(id: number) {
    return this.instanceRepo.findOne({ where: { id }, relations: ['skin', 'owner'] });
  }

  async update(id: number, dto: UpdateSkinInstanceDto) {
    const updateData: any = { ...dto };

    if (dto.skin) {
      updateData.skin = await this.skinRepo.findOneBy({ id: dto.skin });
    }

    if (dto.owner) {
      updateData.owner = await this.userRepo.findOneBy({ id: dto.owner });
    }

    await this.instanceRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.instanceRepo.delete(id);
  }
}
