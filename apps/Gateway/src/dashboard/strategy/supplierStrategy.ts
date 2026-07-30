import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../prisma/Prisma.service";

@Injectable()
export class SupplierStrategy
implements TopRiskStrategy {

    constructor(
        private prisma: PrismaService
    ) {}

    execute(where: Prisma.PurchaseOrderWhereInput){

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