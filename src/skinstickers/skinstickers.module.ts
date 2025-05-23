import { Module } from '@nestjs/common';
import { SkinstickersService } from './skinstickers.service';
import { SkinstickersController } from './skinstickers.controller';

@Module({
  controllers: [SkinstickersController],
  providers: [SkinstickersService],
})
export class SkinstickersModule {}
