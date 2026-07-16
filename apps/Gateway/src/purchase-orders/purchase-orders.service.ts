import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'

import { PrismaService }
from '../../prisma/Prisma.service'

import { CreatePurchaseOrderDto }
from './dto/create-purchase-order.dto'

import { UpdatePurchaseOrderDto }
from './dto/update-purchase-order.dto'

@Injectable()
export class PurchaseOrdersService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(
    data: CreatePurchaseOrderDto
  ) {

    const existingOrder =
      await this.prisma.purchaseOrder.findFirst({
        where: {
          buyerId: data.buyerId,
          supplierId: data.supplierId
        }
      })

    if (existingOrder) {
      throw new BadRequestException(
        'Purchase order already exists'
      )
    }

    return this.prisma.purchaseOrder.create({
      data
    })
  }

  async findAll() {

    return this.prisma.purchaseOrder.findMany({
      include: {
        buyer: true,
        supplier: true,
        items: true
      }
    })
  }

  async findOne(id: number) {

    const purchaseOrder =
      await this.prisma.purchaseOrder.findUnique({
        where: { id },

        include: {
          buyer: true,
          supplier: true,
          items: {
      include: {
      product: true,
      fraudAnalysis: true
    }
  }
}
      })

    if (!purchaseOrder) {
      throw new NotFoundException(
        'Purchase order not found'
      )
    }

    return purchaseOrder
  }

  async update(
    id: number,
    data: UpdatePurchaseOrderDto
  ) {

    const purchaseOrder =
      await this.prisma.purchaseOrder.findUnique({
        where: { id }
      })

    if (!purchaseOrder) {
      throw new NotFoundException(
        'Purchase order not found'
      )
    }

    return this.prisma.purchaseOrder.update({
      where: { id },
      data
    })
  }

  async remove(id: number) {

    const purchaseOrder =
      await this.prisma.purchaseOrder.findUnique({
        where: { id }
      })

    if (!purchaseOrder) {
      throw new NotFoundException(
        'Purchase order not found'
      )
    }

    return this.prisma.purchaseOrder.delete({
      where: { id }
    })
  }
}