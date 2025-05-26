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

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // CRITICAL: Specific routes MUST come before parameterized routes
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

  // Parameterized routes MUST come after specific routes
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}