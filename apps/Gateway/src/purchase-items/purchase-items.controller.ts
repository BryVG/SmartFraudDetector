import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common'

import { PurchaseItemsService } from './purchase-items.service'
import { CreatePurchaseItemDto } from './dto/create-purchase-item.dto'
import { UpdatePurchaseItemDto } from './dto/update-purchase-item.dto'

@Controller('purchaseitems')
export class PurchaseItemsController {

  constructor(
    private readonly purchaseItemsService: PurchaseItemsService
  ) {}

  @Post()
  create(
    @Body() body: CreatePurchaseItemDto
  ) {
    return this.purchaseItemsService.create(body)
  }

  @Get()
  findAll() {
    return this.purchaseItemsService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.purchaseItemsService.findOne(Number(id))
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePurchaseItemDto
  ) {
    return this.purchaseItemsService.update(
      Number(id),
      body
    )
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.purchaseItemsService.remove(Number(id))
  }
}