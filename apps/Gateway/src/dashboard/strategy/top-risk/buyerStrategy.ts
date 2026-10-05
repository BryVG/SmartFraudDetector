import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import { TopRiskPoint, TopRiskStrategy } from "./topriskStrategy";
import { calculateRisk } from "../../utils/calculateRisk";
@Injectable()
export class BuyerStrategy
implements TopRiskStrategy {

    constructor(
        private prisma: PrismaService
    ) {}

    async execute(where: Prisma.PurchaseOrderWhereInput): Promise<TopRiskPoint[]> {

        const buyers = await this.prisma.buyer.findMany({

            select:{
                id: true,
                name: true,
                orders:{
                    where,
                    select:{
                        items:{
                            select:{    
                                 fraudAnalysis:true
                        }
                            }
                        }
                    }
                }

}) 
const data =
      buyers.map(buyer => {

        const items =
          buyer.orders.flatMap(
            order => order.items
          );

        const risk =
          calculateRisk(items);

        return {
          id: buyer.id,
          name: buyer.name,
          ...risk
        };
      });
return data.sort((a, b) => b.suspicious - a.suspicious).slice(0, 10)




};
    
    }