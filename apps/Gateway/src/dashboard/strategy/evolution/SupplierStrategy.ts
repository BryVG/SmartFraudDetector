import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";  
import { EvolutionPoint, groupEvolution } from "../../utils/groupEvolution";
import { EvolutionStrategy, GroupBy } from "./EvolutionStrategy";

@Injectable()
export class SupplierStrategy implements EvolutionStrategy {
   
    constructor(
        private prisma: PrismaService
    ) {}

    async execute(where: Prisma.PurchaseOrderWhereInput, groupBy: GroupBy): Promise<EvolutionPoint[]> {

        const suppliers = await this.prisma.supplier.findMany({
            select:{
                id: true,
                orders: {
                    select:{
                        createdAt: true,
                        items:{
                            select:{
                                fraudAnalysis: {
                                    select:{
                                        suspicious: true
                                    }
                                }
                            }
                        }
                    },
                    where
                }
            }
        });

        const data = suppliers.flatMap(supplier =>
            
            supplier.orders.map(order => ({
                date: order.createdAt,
                fraudulent: order.items.some(item =>
                    item.fraudAnalysis?.suspicious ?? false
                ),
                entityId: supplier.id
            }))
        )
        return groupEvolution(data, groupBy);
}}