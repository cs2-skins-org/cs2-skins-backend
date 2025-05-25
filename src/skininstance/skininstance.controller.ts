import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { SkinInstanceService } from './skininstance.service';
import { CreateSkinInstanceDto } from './dto/create-skininstance.dto';
import { UpdateSkinInstanceDto } from './dto/update-skininstance.dto';
import { TopUpUserDto } from 'src/users/dto/topup-user.dto';

@Controller('skin-instances')
export class SkinInstanceController {
  usersService: any;
  constructor(private readonly service: SkinInstanceService) {}

  @Post()
  create(@Body() dto: CreateSkinInstanceDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkinInstanceDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
