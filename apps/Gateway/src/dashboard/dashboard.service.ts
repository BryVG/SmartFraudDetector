import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'

import { PrismaService }
from '../../prisma/Prisma.service'
import { TopRiskFactory } from './strategy/top-risk/TopRiskFactory'

@Injectable()
export class DashboardService {

  constructor(
    private prisma: PrismaService,
    private factory: TopRiskFactory
  ) {}

async getTopRisk(type:string, where:any){

        const strategy =
            this.factory.get(type);

        return strategy.execute(where);

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