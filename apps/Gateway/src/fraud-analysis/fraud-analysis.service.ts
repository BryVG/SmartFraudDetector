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
  async analisarDemo() {

  const itens = await this.prisma.purchaseItem.findMany({
    take: 5,

    include: {
      product: true,
      purchaseOrder: {
        include: {
          supplier: true
        }
      }
    }
  })

  const resultados = []

  for (const item of itens) {

    const response = await fetch(
      'http://localhost:5000/api/analisar',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          descricao: item.product.name,

          unidade: item.unit,

          preco: item.unitPrice,

          quantidade: item.quantity,

          valor_total: item.totalPrice,

          fornecedor: String(
            item.purchaseOrder.supplierId
          ),

          orgao: 'DEMO',

          data_compra:
            item.purchaseOrder.createdAt
              .toISOString(),

          numeroControlePNCP:
            `DEMO-${item.id}`
        })
      }
    )

    const resultado = await response.json()

    resultados.push({
      itemId: item.id,

      produto: item.product.name,

      fornecedor:
        item.purchaseOrder.supplier.name,

      preco: item.unitPrice,

      quantidade: item.quantity,

      valorTotal: item.totalPrice,

      ...resultado
    })
  }

  return resultados
}
}