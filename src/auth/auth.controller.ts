import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}




@Post('register')
async register(@Body() body: { email: string; password: string; username: string }) {
  const existing = await this.usersService.findByEmail(body.email);
  if (existing) {
    throw new BadRequestException('Email already in use');
  }

  const password_hash = await this.authService.hashPassword(body.password); // ✅ Must hash!
  return this.usersService.createUser(body.email, password_hash, body.username);
}
@Post('login')
async login(@Body() body: { email: string; password: string }) {
  const user = await this.authService.validateUser(body.email, body.password);
  if (!user) {
    throw new UnauthorizedException();
  }
  return this.authService.login(user);
}


}
