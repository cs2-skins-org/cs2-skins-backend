import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'supersecret',
    });
  }

  async validate(payload: any) {
    // Changed from 'userId' to 'sub' to match controller expectations
    return { sub: payload.sub, email: payload.email };
  }
}