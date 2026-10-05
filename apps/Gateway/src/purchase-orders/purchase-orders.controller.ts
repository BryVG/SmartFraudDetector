import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common'

import { PurchaseOrdersService } from './purchase-orders.service'
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto'
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto'

@Controller('purchaseorders')
export class PurchaseOrdersController {

  constructor(
    private readonly purchaseOrderService: PurchaseOrdersService
  ) {}

  @Post()
  create(
    @Body() body: CreatePurchaseOrderDto
  ) {
    return this.purchaseOrderService.create(body)
  }

  @Get()
  findAll() {
    return this.purchaseOrderService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.purchaseOrderService.findOne(Number(id))
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePurchaseOrderDto
  ) {
    return this.purchaseOrderService.update(
      Number(id),
      body
    )
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.purchaseOrderService.remove(Number(id))
  }
}