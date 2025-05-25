    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { SkinInstance } from '../skininstance/entities/skininstance.entity';
    import { User } from '../users/entities/user.entity';
    import { MarketplaceController } from './marketplace.controller';
    import { MarketplaceService } from './marketplace.service';

    @Module({
    imports: [TypeOrmModule.forFeature([SkinInstance, User])],
    controllers: [MarketplaceController],
    providers: [MarketplaceService],
    })
    export class MarketplaceModule {}

