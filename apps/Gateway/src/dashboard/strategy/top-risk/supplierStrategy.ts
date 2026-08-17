import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import { TopRiskStrategy } from "./topriskStrategy";
import { TopRiskPoint } from "./TopRiskFactory";
import { calculateRisk } from "../../utils/calculateRisk";
@Injectable()
export class SupplierStrategy
implements TopRiskStrategy {

    constructor(
        private prisma: PrismaService
    ) {}

  async execute(where: Prisma.PurchaseOrderWhereInput) : Promise<TopRiskPoint[]> {

    const suppliers = await this.prisma.supplier.findMany({

            select:{
                id:true,
                name:true,
                orders:{
                    where,
                    select:{
                        items:{
                            select:{
                                fraudAnalysis:{
                                    select:{
                                        suspicious:true
                                    }
                                }
                            }
                        }
                    }
                }

            }

        });
        const data = suppliers.map(supplier =>{
            const items = supplier.orders.flatMap(order => order.items);
            const risk = calculateRisk(items);

            return {
                id: supplier.id,
                name: supplier.name,
                ...risk
            };
        })
       return data.sort((a, b) => b.suspicious - a.suspicious).slice(0, 10);
    }}

