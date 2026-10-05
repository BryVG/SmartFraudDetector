import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'

import { PrismaService }
from '../../prisma/Prisma.service'

import { CreateProductDto }
from './dto/create-product.dto'

import { UpdateProductDto }
from './dto/update-product.dto'

@Injectable()
export class ProductsService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(
    data: CreateProductDto
  ) {

    const existingProduct =
      await this.prisma.product.findFirst({
        where: {
          name: data.name
        }
      })

    if (existingProduct) {
      throw new BadRequestException(
        'Product already exists'
      )
    }

    return this.prisma.product.create({
      data
    })
  }

  async findAll() {

    return this.prisma.product.findMany({
      include: {
        items: true
      }
    })
  }

  async findOne(id: number) {

    const product =
      await this.prisma.product.findUnique({
        where: { id },

        include: {
          items: true
        }
      })

    if (!product) {
      throw new NotFoundException(
        'Product not found'
      )
    }

    return product
  }

  async update(
    id: number,
    data: UpdateProductDto
  ) {

    const product =
      await this.prisma.product.findUnique({
        where: { id }
      })

    if (!product) {
      throw new NotFoundException(
        'Product not found'
      )
    }

    return this.prisma.product.update({
      where: { id },
      data
    })
  }

  async remove(id: number) {

    const product =
      await this.prisma.product.findUnique({
        where: { id }
      })

    if (!product) {
      throw new NotFoundException(
        'Product not found'
      )
    }

    return this.prisma.product.delete({
      where: { id }
    })
  }
}