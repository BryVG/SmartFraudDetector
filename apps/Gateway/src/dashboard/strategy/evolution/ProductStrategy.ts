
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../../../prisma/Prisma.service";
import { EvolutionStrategy, GroupBy } from "./EvolutionStrategy";
import { groupEvolution } from "../../utils/groupEvolution";

@Injectable()
export class ProductEvolutionStrategy implements EvolutionStrategy {
  constructor(private prisma: PrismaService) {}

  async execute(
    where: Prisma.PurchaseOrderWhereInput,
    groupBy: GroupBy
  ) {
    const products = await this.prisma.product.findMany({
      select: {
        items: {
          where: {
            purchaseOrder: where
          },
          select: {
            purchaseOrder: {
              select: {
                createdAt: true
              }
            },
            fraudAnalysis: {
              select: {
                suspicious: true
              }
            }
          }
        }
      }
    });

    const data = products.flatMap(product =>
      product.items.map(item => ({
        date: item.purchaseOrder.createdAt,
        fraudulent: item.fraudAnalysis?.suspicious ?? false
      }))
    );

    return groupEvolution(data, groupBy);
  }
}
