import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common'
import { CreateBuyerDto } from './dto/create-buyer.dto' 
import { UpdateBuyerDto } from './dto/update-buyer.dto' 
import { BuyersService } from './buyers.service'
import { ParseIntPipe } from '@nestjs/common' 

@Controller('buyers')
export class BuyersController {

  constructor(
    private readonly buyersService: BuyersService
  ) {}

  @Post()
  create(
    @Body() body: CreateBuyerDto
  ) {
    return this.buyersService.create(body)
  }

  @Get()
  findAll() {
    return this.buyersService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.buyersService.findOne(Number(id))
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBuyerDto
  ) {
    return this.buyersService.update(
      Number(id),
      body
    )
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.buyersService.remove(Number(id))
  }
}