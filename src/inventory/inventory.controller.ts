import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // 🔍 Get all skins owned by the logged-in user
  @Get()
  getMyInventory(@Request() req) {
    return this.inventoryService.getUserInventory(req.user.sub);
  }

  // ➕ Admin/debug: add skin to user inventory
  @Post('add')
  addSkinToUser(@Body() body: { userId: number; skinId: number }) {
    return this.inventoryService.addSkinToUser(body.userId, body.skinId);
  }

  // 🏷️ Mark a skin as listed for sale
  @Post(':id/list')
  listForSale(@Param('id') id: number, @Request() req) {
    return this.inventoryService.listSkinForSale(id, req.user.sub);
  }


}
