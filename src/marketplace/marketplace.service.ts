import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { SkinInstance } from '../skininstance/entities/skininstance.entity';
import { User } from '../users/entities/user.entity';

/**
 * Service that handles marketplace logic such as listing skins for sale,
 * retrieving listings, and processing purchases.
 */
@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(SkinInstance)
    private readonly skinRepo: Repository<SkinInstance>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Retrieves all skins currently listed for sale in the marketplace.
   *
   * @returns An array of skin instances with price and ownership data.
   */
  async getAllListings() {
    return this.skinRepo.find({
      where: {
        is_listed_for_sale: true,
        price: Not(IsNull()),
      },
      relations: ['skin', 'owner'],
    });
  }

  /**
   * Lists a skin for sale if the skin belongs to the authenticated user.
   *
   * @param userId - The ID of the user listing the skin.
   * @param skinInstanceId - The ID of the skin instance to be listed.
   * @param price - The listing price for the skin.
   * @returns The updated skin entity.
   * @throws {ForbiddenException} If the user does not own the skin.
   */
  async listSkinForSale(userId: number, skinInstanceId: number, price: number) {
    const skin = await this.skinRepo.findOne({
      where: { id: skinInstanceId },
      relations: ['owner'],
    });

    if (!skin || skin.owner.id !== userId) {
      throw new ForbiddenException('Not your skin');
    }

    skin.is_listed_for_sale = true;
    skin.price = price;
    return this.skinRepo.save(skin);
  }

  /**
   * Processes the purchase of a skin by an authenticated buyer.
   *
   * @param skinInstanceId - The ID of the skin being bought.
   * @param buyerId - The ID of the user attempting the purchase.
   * @returns A confirmation message and the purchased skin ID.
   * @throws {NotFoundException} If the skin or buyer is not found.
   * @throws {BadRequestException} If the price or balances are invalid, or if the buyer lacks sufficient funds.
   */
  async buySkin(skinInstanceId: number, buyerId: number) {
    const skin = await this.skinRepo.findOne({
      where: { id: skinInstanceId, is_listed_for_sale: true },
      relations: ['owner'],
    });

    if (!skin) {
      throw new NotFoundException('Skin not found or not for sale');
    }

    const seller = skin.owner;
    const buyer = await this.userRepo.findOneBy({ id: buyerId });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }

    const price = Number(skin.price);
    const buyerBalance = Number(buyer.balance);
    const sellerBalance = Number(seller.balance);

    if (isNaN(price) || isNaN(buyerBalance) || isNaN(sellerBalance)) {
      throw new BadRequestException('Invalid number format for balance or price');
    }

    if (buyerBalance < price) {
      throw new BadRequestException('Not enough balance');
    }

    buyer.balance = buyerBalance - price;
    seller.balance = sellerBalance + price;

    skin.owner = buyer;
    skin.is_listed_for_sale = false;
    skin.price = null;

    await this.userRepo.save([buyer, seller]);
    await this.skinRepo.save(skin);

    console.log('BUY attempt → buyerId:', buyerId, 'skinId:', skinInstanceId);
    console.log('Skin:', skin);
    console.log('Buyer:', buyer);
    console.log('Seller:', seller);
    console.log('Skin price:', skin.price);
    console.log('Buyer balance:', buyer.balance);

    return { message: 'Purchase complete', skinId: skin.id };
  }
}

