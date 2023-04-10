import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/:id')
  getHello(@Param('id', ParseIntPipe) id: number): number {
    if (id < 1) {
      throw new BadRequestException('id must be greater than 0');
    }

    return id;
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateDto) {
    console.log('post create');
    const res = await this.appService.save(dto);
    return res;
  }
}
