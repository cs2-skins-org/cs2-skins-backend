import { Injectable } from '@nestjs/common';
import { CreateSkinstickerDto } from './dto/create-skinsticker.dto';
import { UpdateSkinstickerDto } from './dto/update-skinsticker.dto';

@Injectable()
export class SkinstickersService {
  create(createSkinstickerDto: CreateSkinstickerDto) {
    return 'This action adds a new skinsticker';
  }

  findAll() {
    return `This action returns all skinstickers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skinsticker`;
  }

  update(id: number, updateSkinstickerDto: UpdateSkinstickerDto) {
    return `This action updates a #${id} skinsticker`;
  }

  remove(id: number) {
    return `This action removes a #${id} skinsticker`;
  }
}
