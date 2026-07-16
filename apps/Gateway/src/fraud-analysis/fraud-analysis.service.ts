import {
  Injectable,
  NotFoundException
} from '@nestjs/common'

import { PrismaService }
from '../../prisma/Prisma.service'

import { CreateFraudAnalysisDto }
from './dto/create-fraud-analysis.dto'

import { UpdateFraudAnalysisDto }
from './dto/update-fraud-analysis.dto'

@Injectable()
export class FraudAnalysisService {

  constructor(
    private prisma: PrismaService
  ) {}

  async create(
    data: CreateFraudAnalysisDto
  ) {

    return this.prisma.fraudAnalysis.create({
      data
    })
  }

  async findAll() {

    return this.prisma.fraudAnalysis.findMany({
      include: {
        purchaseItem: true
      }
    })
  }

  async findOne(id: number) {

    const analysis =
      await this.prisma.fraudAnalysis.findUnique({
        where: { id },

        include: {
        purchaseItem: true
      }
      })

    if (!analysis) {
      throw new NotFoundException(
        'Fraud analysis not found'
      )
    }

    return analysis
  }

  async update(
    id: number,
    data: UpdateFraudAnalysisDto
  ) {

    const analysis =
      await this.prisma.fraudAnalysis.findUnique({
        where: { id }
      })

    if (!analysis) {
      throw new NotFoundException(
        'Fraud analysis not found'
      )
    }

    return this.prisma.fraudAnalysis.update({
      where: { id },
      data
    })
  }

  async remove(id: number) {

    const analysis =
      await this.prisma.fraudAnalysis.findUnique({
        where: { id }
      })

    if (!analysis) {
      throw new NotFoundException(
        'Fraud analysis not found'
      )
    }

    return this.prisma.fraudAnalysis.delete({
      where: { id }
    })
  }
}