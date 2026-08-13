import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import {
  EvolutionStrategy,
  GroupBy
} from "./EvolutionStrategy";
import { groupEvolution } from "../../utils/groupEvolution";
@Injectable()
export class SupplierEvolutionStrategy
implements EvolutionStrategy{

    constructor(
        private prisma: PrismaService
    ){}

async execute(
    where: Prisma.PurchaseOrderWhereInput,
    groupBy: GroupBy
) {

  const suppliers = await this.prisma.supplier.findMany({

    select: {

      orders: {
        where,
        select: {
        
          items: {
            select: {

          fraudAnalysis: {
            where: {
              suspicious: true
            }
          }}}

        }

      }

    }
  });

const data =
  suppliers.map(supplier =>
    supplier.orders.some(order => ({
      date: order.createdAt,

      fraudulent:
        supplier.orders.some(order => 
          order.items.some(item => item.fraudAnalysis.length > 0)
        )
    }))
  );

  return groupEvolution(data, groupBy);
}}