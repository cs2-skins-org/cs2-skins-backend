import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importing feature modules
import { UsersModule } from './users/users.module';
import { SkinModule } from './skin/skin.module';
import { SkinStickersModule } from './skinstickers/skinstickers.module';
import { StickerModule } from './sticker/sticker.module';
import { SkinInstanceModule } from './skininstance/skininstance.module';
import { TradeItemsModule } from './tradeitems/tradeitems.module';
import { TradeModule } from './trade/trade.module';
import { CollectionModule } from './collection/collection.module';
import { AuthModule } from './auth/auth.module';
// import { InventoryModule } from './inventory/inventory.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    // TypeORM database connection configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'cs2-skins-db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Load all entities automatically
      synchronize: true, // Use only in development - auto-generates tables
    }),
    // Registering application modules
    UsersModule,
    SkinModule,
    SkinStickersModule,
    StickerModule,
    SkinInstanceModule,
    TradeItemsModule,
    TradeModule,
    CollectionModule,
    AuthModule,
    MarketplaceModule,
    // InventoryModule,
  ],
  controllers: [AppController], // Root-level controller
  providers: [AppService], // Root-level service
})
export class AppModule {}
