import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that uses the 'jwt' strategy to protect routes.
 * 
 * When applied, it ensures that the request has a valid JWT token.
 * If the token is missing or invalid, the request will be denied.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
