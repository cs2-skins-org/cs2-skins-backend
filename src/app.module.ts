import { Module } from '@nestjs/common';
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
  imports: [UsersModule, SkinModule, SkinstickersModule, StickerModule, SkininstanceModule, TradeitemsModule, TradeModule, CollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
