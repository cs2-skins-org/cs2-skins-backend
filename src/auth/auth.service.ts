import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

/**
 * Service responsible for handling authentication logic,
 * including user validation, password hashing, and JWT generation.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Validates a user's credentials.
   * 
   * @param email - The user's email address.
   * @param plainPassword - The user's plaintext password.
   * @returns The user object without password hash if credentials are valid, otherwise null.
   */
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

  /**
   * Hashes a plaintext password using bcrypt.
   * 
   * @param password - The plaintext password to hash.
   * @returns A promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Logs in a validated user by generating a JWT access token.
   * 
   * @param user - The user object (already validated).
   * @returns An object containing the JWT access token.
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
