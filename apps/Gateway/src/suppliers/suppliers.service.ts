import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'

import { PrismaService }
from '../../prisma/Prisma.service'

import { CreateSupplierDto }
from './dto/create-supplier.dto'

import { UpdateSupplierDto }
from './dto/update-supplier.dto'

@Injectable()
export class SuppliersService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(
    data: CreateSupplierDto
  ) {

    const existingSupplier =
      await this.prisma.supplier.findFirst({
        where: {
          name: data.name
        }
      })

    if (existingSupplier) {
      throw new BadRequestException(
        'Supplier already exists'
      )
    }

    return this.prisma.supplier.create({
      data
    })
  }

  async findAll() {

    return this.prisma.supplier.findMany({
      include: {
        orders: true
      }
    })
  }

  async findOne(id: number) {

    const supplier =
      await this.prisma.supplier.findUnique({
        where: { id },

        include: {
          orders: true
        }
      })

    if (!supplier) {
      throw new NotFoundException(
        'Supplier not found'
      )
    }

    return supplier
  }

  async update(
    id: number,
    data: UpdateSupplierDto
  ) {

    const supplier =
      await this.prisma.supplier.findUnique({
        where: { id }
      })

    if (!supplier) {
      throw new NotFoundException(
        'Supplier not found'
      )
    }

    return this.prisma.supplier.update({
      where: { id },
      data
    })
  }

  async remove(id: number) {

    const supplier =
      await this.prisma.supplier.findUnique({
        where: { id }
      })

    if (!supplier) {
      throw new NotFoundException(
        'Supplier not found'
      )
    }

    return this.prisma.supplier.delete({
      where: { id }
    })
  }
}