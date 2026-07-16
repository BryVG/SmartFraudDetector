import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'

import { PrismaService }
from '../../prisma/Prisma.service'

import { CreatePurchaseItemDto }
from './dto/create-purchase-item.dto'

import { UpdatePurchaseItemDto }
from './dto/update-purchase-item.dto'

@Injectable()
export class PurchaseItemsService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(
    data: CreatePurchaseItemDto
  ) {

    const existingItem =
      await this.prisma.purchaseItem.findFirst({
        where: {
          purchaseOrderId: data.purchaseOrderId,
          productId: data.productId
        }
      })

    if (existingItem) {
      throw new BadRequestException(
        'This product already exists in the order'
      )
    }

    return this.prisma.purchaseItem.create({
      data
    })
  }

  async findAll() {

    return this.prisma.purchaseItem.findMany({
      include: {
        purchaseOrder: true,
        product: true,
        fraudAnalysis: true
      }
    })
  }

  async findOne(id: number) {

    const purchaseItem =
      await this.prisma.purchaseItem.findUnique({
        where: { id },

        include: {
          purchaseOrder: true,
          product: true,
          fraudAnalysis: true
        }
      })

    if (!purchaseItem) {
      throw new NotFoundException(
        'Purchase item not found'
      )
    }

    return purchaseItem
  }

  async update(
    id: number,
    data: UpdatePurchaseItemDto
  ) {

    const purchaseItem =
      await this.prisma.purchaseItem.findUnique({
        where: { id }
      })

    if (!purchaseItem) {
      throw new NotFoundException(
        'Purchase item not found'
      )
    }

    return this.prisma.purchaseItem.update({
      where: { id },
      data
    })
  }

  async remove(id: number) {

    const purchaseItem =
      await this.prisma.purchaseItem.findUnique({
        where: { id }
      })

    if (!purchaseItem) {
      throw new NotFoundException(
        'Purchase item not found'
      )
    }

    return this.prisma.purchaseItem.delete({
      where: { id }
    })
  }
}