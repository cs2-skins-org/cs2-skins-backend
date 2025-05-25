import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkinInstance } from './entities/skininstance.entity';
import { User } from '../users/entities/user.entity';
import { Skin } from '../skin/entities/skin.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(SkinInstance)
    private readonly skinInstanceRepo: Repository<SkinInstance>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Skin)
    private readonly skinRepo: Repository<Skin>,
  ) {}

  // 🔍 Get all owned (non-traded) skins
  async getUserInventory(userId: number) {
    return this.skinInstanceRepo.find({
      where: {
        owner: { id: userId },
        is_traded_away: false,
      },
      relations: ['skin'],
    });
  }

  // ➕ Admin/debug: give skin to user
  async addSkinToUser(userId: number, skinId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const skin = await this.skinRepo.findOneBy({ id: skinId });

    if (!user || !skin) throw new NotFoundException('User or skin not found');

    const instance = this.skinInstanceRepo.create({
      owner: user,
      skin,
      float_value: Math.random() * 0.9 + 0.1,
    });

    return this.skinInstanceRepo.save(instance);
  }

  // 🏷️ Mark a skin for sale
  async listSkinForSale(instanceId: number, userId: number) {
    const skin = await this.skinInstanceRepo.findOne({
      where: { id: instanceId },
      relations: ['owner'],
    });

    if (!skin || skin.owner.id !== userId) {
      throw new ForbiddenException('You do not own this skin');
    }

    skin.is_listed_for_sale = true;
    return this.skinInstanceRepo.save(skin);
  }

}
