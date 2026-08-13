import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../../../../prisma/Prisma.service";
import {EvolutionPoint} from "../../utils/groupEvolution"
import {
  EvolutionStrategy,
  GroupBy
} from "./EvolutionStrategy";
import { groupEvolution } from "../../utils/groupEvolution";

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

          createdAt: true,

          items: {

            select: {

              fraudAnalysis: {

                select: {

                  suspicious: true

                }

              }

            }

          }

        }

      });
      const data = contracts.map(contract => ({
  date: contract.createdAt,

  fraudulent: contract.items.some(item =>
    item.fraudAnalysis.length > 0
  )
}));

    return groupEvolution(data, groupBy);
  } 
}