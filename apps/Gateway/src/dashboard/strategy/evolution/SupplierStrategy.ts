import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import {
  EvolutionStrategy,
  GroupBy
} from "./EvolutionStrategy";
import {EvolutionPoint} from "../../utils/groupEvolution"
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
):Promise<EvolutionPoint[]> {

  const suppliers = await this.prisma.supplier.findMany({

    select: {

      orders: {
        where,
        
        select: {
          createdAt:true,
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
  suppliers.flatMap(supplier =>
    supplier.orders.map(order => ({
      date: order.createdAt,

      fraudulent:
          order.items.some(item => item.fraudAnalysis.length > 0)
    }))
  );

  return groupEvolution(data, groupBy);
}}