import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { SkinModule } from './skin/skin.module';
import { SkinstickersModule } from './skinstickers/skinstickers.module';
import { StickerModule } from './sticker/sticker.module';
import { SkininstanceModule } from './skininstance/skininstance.module';
import { TradeitemsModule } from './tradeitems/tradeitems.module';
import { TradeModule } from './trade/trade.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'cs2-skins-db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Use only in development
    }),
    UsersModule,
    SkinModule,
    SkinstickersModule,
    StickerModule,
    SkininstanceModule,
    TradeitemsModule,
    TradeModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
