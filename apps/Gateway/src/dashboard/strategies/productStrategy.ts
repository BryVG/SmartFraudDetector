import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../../prisma/Prisma.service";
import { TopRiskStrategy } from "./top-risk.strategy";

@Injectable()
export class ProductStrategy
implements TopRiskStrategy {

    constructor(
        private prisma: PrismaService
    ) {}

    execute(where: Prisma.PurchaseOrderWhereInput){

        return this.prisma.product.findMany({

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