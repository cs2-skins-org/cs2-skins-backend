import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT strategy for validating tokens using Passport.
 * 
 * Extracts the JWT from the Authorization header and verifies it using a secret key.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      /**
       * Specifies how the JWT should be extracted from the request.
       * In this case, it uses the Bearer token from the Authorization header.
       */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      /**
       * Secret key used to verify the JWT signature.
       * Should be kept in a secure environment variable in production.
       */
      secretOrKey: 'supersecret',
    });
  }

  /**
   * Called automatically after JWT verification.
   * 
   * @param payload - The decoded JWT payload.
   * @returns A user object containing the subject (user ID) and email.
   */
  async validate(payload: any) {
    // Changed from 'userId' to 'sub' to match controller expectations
    return { sub: payload.sub, email: payload.email };
  }
}
