import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
  import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
    private users: User[] = [];
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
  const user = this.repo.create({
    ...dto,
    balance: dto.balance ?? 0, // Ensure default value
  });
  return this.repo.save(user);
  }


  findAll() {
    return this.repo.find({ relations: ['sentTrades', 'receivedTrades', 'inventory'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['sentTrades', 'receivedTrades', 'inventory'] });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async createUser(email: string, password_hash: string, username: string) {
    const user = this.repo.create({
      email,
      username,
      password_hash,
      steam_id: '',
      profile_url: '',
      balance: 0, // default balance
    });
    return this.repo.save(user);
  }



async findByEmail(email: string) {
  return this.repo.findOne({ where: { email } });
}



  
}

