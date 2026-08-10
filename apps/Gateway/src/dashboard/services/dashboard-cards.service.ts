
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../../prisma/Prisma.service"


@Injectable()

export class CardService {
    constructor(
        private prisma: PrismaService
    ) {}
async getCards() {
  const[totalContracts, monitoredValue, highRiskContracts, avgRisk] = await Promise.all([
    this.prisma.purchaseOrder.count(),
    this.prisma.purchaseOrder.aggregate({
      _sum: {
        totalValue: true
      }
    }),
    this.prisma.fraudAnalysis.count({
      where: {
        fraudScore: {
          gt: 0.8
        }
      }
    }),
    this.prisma.fraudAnalysis.aggregate({
            where: {
        fraudScore: {
          gt: 0.8
        }
      },
      _avg: {
        fraudScore: true
      }
    })
  ])

  return {
    totalContracts,
    monitoredValue: monitoredValue._sum.totalValue ?? 0,
    highRiskContracts,
    avgRisk: avgRisk._avg.fraudScore ?? 0
  }
}}
