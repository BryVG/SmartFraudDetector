import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'

import { PrismaService }
from '../../prisma/Prisma.service'
import { buildDashboardWhere } from './utils/filters'
import { DashboardFilterDto } from './dto/dashboard.filter.dto'
@Injectable()
export class DashboardService {

  constructor(
    private prisma: PrismaService
  ) {}

async getCards(filters: DashboardFilterDto) {
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
}
async getTopRisk(type: string, where: any) {
    
}
async getCharts() {
    const[riskDistribution, topContracts, riskEvolution ] = await Promise.all([
    ])
}

async getRiskDistribution(filters: DashboardFilterDto) {

    const where =
        buildDashboardWhere(filters);

    const [

        low,

        medium,

        high,

        critical

    ] = await Promise.all([

        this.prisma.fraudAnalysis.count({

            where:{

                ...where,

                score:{
                    gte:0,
                    lte:30
                }

            }

        }),

        this.prisma.fraudAnalysis.count({

            where:{

                ...where,

                score:{
                    gt:30,
                    lte:60
                }

            }

        }),

        this.prisma.fraudAnalysis.count({

            where:{

                ...where,

                score:{
                    gt:60,
                    lte:80
                }

            }

        }),

        this.prisma.fraudAnalysis.count({

            where:{

                ...where,

                score:{
                    gt:80
                }

            }

        })

    ]);

    return [

        {

            risk:"Low",

            value:low

        },

        {

            risk:"Medium",

            value:medium

        },

        {

            risk:"High",

            value:high

        },

        {

            risk:"Critical",

            value:critical

        }

    ];

}}