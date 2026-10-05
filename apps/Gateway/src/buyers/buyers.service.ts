import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'

import { PrismaService } from '../../prisma/Prisma.service'

import { CreateBuyerDto } from './dto/create-buyer.dto'
import { UpdateBuyerDto } from './dto/update-buyer.dto'

@Injectable()
export class BuyersService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(data: CreateBuyerDto) {

    const existingBuyer =
      await this.prisma.buyer.findFirst({
        where: {
          name: data.name
        }
      })

    if (existingBuyer) {
      throw new BadRequestException(
        'Buyer already exists'
      )
    }

    return this.prisma.buyer.create({
      data
    })
  }

  async findAll() {
    return this.prisma.buyer.findMany({
      include: {
        orders: true
      }
    })
  }

  async findOne(id: number) {

    const buyer =
      await this.prisma.buyer.findUnique({
        where: { id },

        include: {
          orders: true
        }
      })

    if (!buyer) {
      throw new NotFoundException(
        'Buyer not found'
      )
    }

    return buyer
  }

  async update(
    id: number,
    data: UpdateBuyerDto
  ) {

    const buyer =
      await this.prisma.buyer.findUnique({
        where: { id }
      })

    if (!buyer) {
      throw new NotFoundException(
        'Buyer not found'
      )
    }

    return this.prisma.buyer.update({
      where: { id },
      data
    })
  }

  async remove(id: number) {

    const buyer =
      await this.prisma.buyer.findUnique({
        where: { id }
      })

    if (!buyer) {
      throw new NotFoundException(
        'Buyer not found'
      )
    }

    return this.prisma.buyer.delete({
      where: { id }
    })
  }
}