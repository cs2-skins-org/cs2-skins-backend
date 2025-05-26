import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  create(dto: CreateCollectionDto) {
    const collection = this.collectionRepository.create(dto);
    return this.collectionRepository.save(collection);
  }

  findAll() {
    return this.collectionRepository.find();
  }

  findOne(id: number) {
    return this.collectionRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCollectionDto) {
    await this.collectionRepository.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.collectionRepository.delete(id);
  }
}
