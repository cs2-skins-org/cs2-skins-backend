import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TopUpUserDto } from './dto/topup-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Optional local array for in-memory user operations (unused here)
  private users: User[] = [];

  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  // Create a new user with optional initial balance
  create(dto: CreateUserDto) {
    const user = this.repo.create({
      ...dto,
      balance: dto.balance ?? 0, // Ensure default value
    });
    return this.repo.save(user);
  }

  // Retrieve all users along with their trades and owned skins
  findAll() {
    return this.repo.find({ 
      relations: ['sentTrades', 'receivedTrades', 'skinInstances'] 
    });
  }

  // Retrieve a single user by ID with related trades and skins
  findOne(id: number) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['sentTrades', 'receivedTrades', 'skinInstances'] 
    });
  }

  // Update a user's data by ID
  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  // Delete a user by ID
  remove(id: number) {
    return this.repo.delete(id);
  }

  // Register a new user with hashed password and default values
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

  // Find a user by their email (used in authentication)
  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  // Add balance to a user's account (top-up logic)
  async topUpBalance(userId: number, dto: TopUpUserDto) {
    console.log('=== TOPUP SERVICE DEBUG ===');
    console.log('User ID received:', userId, typeof userId);
    console.log('DTO received:', dto);
    console.log('Amount:', dto.amount, typeof dto.amount);
    
    // Find user without loading relations
    const user = await this.repo.findOneBy({ id: userId });
    console.log('User found:', user ? `Yes (ID: ${user.id}, Balance: ${user.balance})` : 'No');
    
    if (!user) {
      console.log('ERROR: User not found!');
      throw new Error(`User with ID ${userId} not found`);
    }

    // Parse and calculate new balance
    const oldBalance = Number(user.balance);
    const addAmount = Number(dto.amount);
    const newBalance = oldBalance + addAmount;
    
    console.log('Balance calculation:');
    console.log('  Old balance:', oldBalance);
    console.log('  Adding:', addAmount);
    console.log('  New balance:', newBalance);
    
    user.balance = newBalance;

    // Save updated balance to database
    const savedUser = await this.repo.save(user);
    console.log('User saved successfully, new balance:', savedUser.balance);
    console.log('========================');
    
    return savedUser;
  }
}
