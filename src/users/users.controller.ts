import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TopUpUserDto } from './dto/topup-user.dto';
import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user.
   * @param dto - Data for the new user.
   */
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  /**
   * Get a list of all users.
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Get the balance of the currently authenticated user.
   * Requires JWT authentication.
   * @param req - The request containing the JWT user object.
   */
  @UseGuards(JwtAuthGuard)
  @Get('balance')
  async getBalance(@Request() req: any) {
    try {
      console.log('=== BALANCE ENDPOINT HIT ===');
      console.log('Request user object:', req.user);
      console.log('===========================');

      const userId = req.user?.sub;
      
      if (!userId) {
        console.log('No user ID found in token');
        throw new NotFoundException('User ID not found in token');
      }

      console.log('Looking for user with ID:', userId);
      const user = await this.usersService.findOne(userId);

      if (!user) {
        console.log('User not found in database');
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      console.log('User found, balance:', user.balance);
      return { balance: user.balance, userId: userId };
    } catch (error) {
      console.error('Balance endpoint error:', error);
      throw error;
    }
  }

  /**
   * Top up the balance of the currently authenticated user.
   * Requires JWT authentication.
   * @param req - The request containing the JWT user object.
   * @param dto - Top-up amount data.
   */
  @UseGuards(JwtAuthGuard)
  @Post('topup')
  async topUp(@Request() req: any, @Body() dto: TopUpUserDto) {
    try {
      console.log('=== TOPUP ENDPOINT HIT ===');
      console.log('Request user:', req.user);
      console.log('Body:', dto);
      console.log('========================');

      const userId = req.user?.sub;
      
      if (!userId) {
        throw new NotFoundException('User ID not found in token');
      }

      console.log('Topping up user ID:', userId, 'with amount:', dto.amount);
      const updatedUser = await this.usersService.topUpBalance(userId, dto);
      
      console.log('Topup successful, new balance:', updatedUser.balance);
      return { 
        message: 'Balance updated successfully', 
        newBalance: updatedUser.balance 
      };
    } catch (error) {
      console.error('Topup endpoint error:', error);
      throw error;
    }
  }

  /**
   * Get a user by ID.
   * @param id - The ID of the user to retrieve.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user to update.
   * @param dto - Updated user data.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  /**
   * Delete a user by ID.
   * @param id - The ID of the user to delete.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
