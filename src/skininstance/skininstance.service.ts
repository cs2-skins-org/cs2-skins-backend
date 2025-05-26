import { Injectable, NotFoundException } from '@nestjs/common';
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
    private skinInstanceRepo: Repository<SkinInstance>,

    @InjectRepository(Skin)
    private skinRepo: Repository<Skin>,

    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

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


  findAll(): Promise<SkinInstance[]> {
    return this.skinInstanceRepo.find({ relations: ['skin', 'owner'] });
  }

  async findOne(id: number): Promise<SkinInstance> {
    const instance = await this.skinInstanceRepo.findOne({
      where: { id },
      relations: ['skin', 'owner'],
    });
    if (!instance) throw new NotFoundException('Skin instance not found');
    return instance;
  }

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

  async remove(id: number): Promise<void> {
    const instance = await this.findOne(id);
    await this.skinInstanceRepo.remove(instance);
  }
}