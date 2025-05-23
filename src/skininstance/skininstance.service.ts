import { Injectable } from '@nestjs/common';
import { CreateSkininstanceDto } from './dto/create-skininstance.dto';
import { UpdateSkininstanceDto } from './dto/update-skininstance.dto';

@Injectable()
export class SkininstanceService {
  create(createSkininstanceDto: CreateSkininstanceDto) {
    return 'This action adds a new skininstance';
  }

  findAll() {
    return `This action returns all skininstance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skininstance`;
  }

  update(id: number, updateSkininstanceDto: UpdateSkininstanceDto) {
    return `This action updates a #${id} skininstance`;
  }

  remove(id: number) {
    return `This action removes a #${id} skininstance`;
  }
}
