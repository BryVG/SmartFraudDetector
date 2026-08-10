import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import { TopRiskStrategy } from "./topriskStrategy";
@Injectable()
export class BuyerStrategy
implements TopRiskStrategy {

    constructor(
        private prisma: PrismaService
    ) {}

    execute(where: Prisma.PurchaseOrderWhereInput){

        return this.prisma.buyer.findMany({

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

})  };
    
    }