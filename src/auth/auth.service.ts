import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersService.findByEmail(email);
    console.log('Found user:', user); 
    if (!user) return null;

    const isMatch = await bcrypt.compare(plainPassword, user.password_hash);
      console.log('Password match:', isMatch); 
    if (!isMatch) return null;

    const { password_hash, ...result } = user;
    return result;
  }

async hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}


  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
