import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import { EvolutionStrategy } from "./EvolutionStrategy";
@Injectable()
export class ProductEvolutionStrategy
implements EvolutionStrategy{

    constructor(
        private prisma: PrismaService
    ){}

    async execute(where: Prisma.PurchaseOrderWhereInput){

        return this.prisma.product.findMany({

            include:{

                items:{

                    include:{

                        fraudAnalysis:{
                            fraudScore:{
                                gt: 80
                            }

                        purchaseOrder:{

                            where

                        }}

                    }

                }

            }

        });

    }

}