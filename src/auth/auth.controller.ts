import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

/**
 * Controller handling authentication-related routes.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  /**
   * Registers a new user after checking if the email is already taken.
   * 
   * @param body - The registration payload containing email, password, and username.
   * @returns The newly created user.
   * @throws {BadRequestException} If the email is already in use.
   */
  @Post('register')
  async register(@Body() body: { email: string; password: string; username: string }) {
    const existing = await this.usersService.findByEmail(body.email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const password_hash = await this.authService.hashPassword(body.password); // ✅ Must hash!
    return this.usersService.createUser(body.email, password_hash, body.username);
  }

  /**
   * Authenticates a user and returns an access token if credentials are valid.
   * 
   * @param body - The login payload containing email and password.
   * @returns A JWT or access token for the authenticated user.
   * @throws {UnauthorizedException} If credentials are invalid.
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
