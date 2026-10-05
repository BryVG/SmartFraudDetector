import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import {
  EvolutionStrategy,
  GroupBy
} from "./EvolutionStrategy";
import { groupEvolution } from "../../utils/groupEvolution";
@Injectable()
export class ProductEvolutionStrategy
implements EvolutionStrategy{
    constructor(
        private prisma: PrismaService
    ){}

async execute(
    where: Prisma.PurchaseOrderWhereInput,
    groupBy: GroupBy
) {
    const products = await this.prisma.product.findMany({
        select:{
            items:{
                select:{
                    purchaseOrder:{
                      select:{
                        createdAt: true
                    }, where},
                    fraudAnalysis:{
                        select:{
                        suspicious: true
                    }
                }
            }
        }
    })
    const data = products.map(product => product.items.map(
        item => item.fraudAnalysis.some(fraud => fraud.suspicious === true),
        fraud: item.fraudAnalysis.length > 0

        
    ))
}}