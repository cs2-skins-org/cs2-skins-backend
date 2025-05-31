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

/**
 * Controller for handling skin marketplace operations.
 * 
 * All routes are protected by JWT authentication.
 */
@UseGuards(JwtAuthGuard)
@Controller('market')
export class MarketplaceController {
  constructor(private readonly service: MarketplaceService) {}

  /**
   * Retrieves all listed skins available for purchase.
   *
   * @returns An array of marketplace listings.
   */
  @Get()
  findAll() {
    return this.service.getAllListings();
  }

  /**
   * Lists a skin instance for sale in the marketplace.
   *
   * @param body - An object containing the skin instance ID and price.
   * @param req - The authenticated request object containing the user info.
   * @returns The newly created marketplace listing.
   */
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

  /**
   * Allows an authenticated user to buy a skin by its listing ID.
   *
   * @param id - The ID of the skin listing to purchase.
   * @param req - The authenticated request object containing the user info.
   * @returns The result of the purchase transaction.
   */
  @Post('buy/:id')
  buy(@Param('id') id: number, @Request() req) {
    return this.service.buySkin(id, req.user.sub);
  }
}
