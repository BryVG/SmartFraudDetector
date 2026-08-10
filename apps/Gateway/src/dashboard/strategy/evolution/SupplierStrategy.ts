
import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import { EvolutionStrategy } from "./EvolutionStrategy";
@Injectable()
export class SupplierEvolutionStrategy
implements EvolutionStrategy {

    constructor(
        private prisma: PrismaService
    ){}

    async execute(where: Prisma.PurchaseOrderWhereInput){

        return this.prisma.supplier.findMany({

            include:{

                orders:{

                    where,

                    include:{

                        items:{
                            include:{
                                fraudAnalysis:true
                            }
                        }

                    }

                }

            }

        });

    }

}