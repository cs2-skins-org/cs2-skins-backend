import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Sticker } from './entities/sticker.entity';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';

@Injectable()
export class StickerService {
  constructor(
    @InjectRepository(Sticker)
    private readonly repo: Repository<Sticker>,
  ) {}

  async createMany(dtos: CreateStickerDto[]) {
  const stickers = dtos.map(dto => this.repo.create(dto));
  return this.repo.save(stickers);
}


  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findByName(name: string) {
    return this.repo.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  async update(id: number, dto: UpdateStickerDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
