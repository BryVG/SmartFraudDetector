import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import { TopRiskPoint, TopRiskStrategy } from "./topriskStrategy";
import { calculateRisk } from "../../utils/calculateRisk";
@Injectable()
export class ProductStrategy
implements TopRiskStrategy {

    constructor(
        private prisma: PrismaService
    ) {}

   async execute(where: Prisma.PurchaseOrderWhereInput): Promise<TopRiskPoint[]> {

const products = await this.prisma.product.findMany({

    select: {
        id: true,
        name: true,
        items: {
            
            where: {

                purchaseOrder: where

            },

            select: {

                fraudAnalysis: true,

                purchaseOrder: true

            }

        }

    }

})
      const data = products.map(products =>{
            const items = products.items.flatMap(items => products.items);
            const risk = calculateRisk(items);

            return {
                id: products.id,
                name: products.name,
                ...risk
            };
        })
       return data.sort((a, b) => b.suspicious - a.suspicious).slice(0, 10);
    }}
      