import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../../../../prisma/Prisma.service";

import {
  EvolutionStrategy,
  EvolutionPoint,
  GroupBy
} from "./EvolutionStrategy";

@Injectable()
export class ContractEvolutionStrategy
  implements EvolutionStrategy
{
  constructor(
    private prisma: PrismaService
  ) {}

  async execute(
    where: Prisma.PurchaseOrderWhereInput,
    groupBy: GroupBy
  ): Promise<EvolutionPoint[]> {

    const contracts =
      await this.prisma.purchaseOrder.findMany({

        where,

        select: {

          id: true,

          createdAt: true,

          items: {

            select: {

              fraudAnalysis: {

                select: {

                  fraudScore: true

                }

              }

            }

          }

        }

      });

    // Agrupa os contratos por período
    const grouped =
      new Map<
        string,
        {
          total: number;
          fraudulent: number;
        }
      >();

    for (const contract of contracts) {

      const period =
        this.getPeriod(
          contract.createdAt,
          groupBy
        );

      if (!grouped.has(period)) {

        grouped.set(period, {
          total: 0,
          fraudulent: 0
        });

      }

      const data =
        grouped.get(period)!;

      data.total++;

      const hasFraud =
        contract.items.some(item =>
          item.fraudAnalysis.some(
            analysis =>
              analysis.fraudScore >= 80
          )
        );

      if (hasFraud) {
        data.fraudulent++;
      }

    }

    return Array.from(
      grouped,
      ([period, data]) => ({
        period,
        ...data
      })
    );

  }

  private getPeriod(
    date: Date,
    groupBy: GroupBy
  ): string {

    switch (groupBy) {

      case "hour":

        return date
          .toISOString()
          .slice(0, 13);

      case "day":

        return date
          .toISOString()
          .slice(0, 10);

      case "month":

        return date
          .toISOString()
          .slice(0, 7);

      case "year":

        return date
          .toISOString()
          .slice(0, 4);

    }

  }

}