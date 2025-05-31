import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  // Import TypeORM module with the User entity
  imports: [TypeOrmModule.forFeature([User])],

  // Declare the controller handling user-related routes
  controllers: [UsersController],

  // Declare the service providing user-related business logic
  providers: [UsersService],

  // Export the service so it can be used in other modules (e.g., AuthModule)
  exports: [UsersService],
})
export class UsersModule {}
