import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

/**
 * Authentication module that sets up JWT, Passport strategies,
 * and binds the AuthController and AuthService.
 */
@Module({
  imports: [
    /**
     * Passport module for managing authentication strategies.
     */
    PassportModule,

    /**
     * JWT module configured with a static secret and 1-day expiration.
     */
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),

    /**
     * Imports UsersModule to access user-related services.
     */
    UsersModule,
  ],

  /**
   * Binds the authentication controller.
   */
  controllers: [AuthController],

  /**
   * Provides the AuthService and JwtStrategy to the DI container.
   */
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
