import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('market')
export class MarketplaceController {
  constructor(private readonly service: MarketplaceService) {}

  @Get()
  findAll() {
    return this.service.getAllListings();
  }

  @Post('list')
  list(@Body() body: { skinInstanceId: number; price: number }, @Request() req) {
    // Add debugging
    console.log('=== DEBUG LIST ENDPOINT ===');
    console.log('Request user:', req.user);
    console.log('Body:', body);
    console.log('User ID (sub):', req.user?.sub);
    console.log('===========================');
    
    return this.service.listSkinForSale(req.user.sub, body.skinInstanceId, body.price);
  }

  @Post('buy/:id')
  buy(@Param('id') id: number, @Request() req) {
    return this.service.buySkin(id, req.user.sub);
  }
}