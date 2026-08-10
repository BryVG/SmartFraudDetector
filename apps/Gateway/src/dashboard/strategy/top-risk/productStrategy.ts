import { Injectable } from "@nestjs/common";
import {Prisma} from '@prisma/client';
import { PrismaService } from "../../../../prisma/Prisma.service";
import { TopRiskStrategy } from "./topriskStrategy";
@Injectable()
export class ProductStrategy
implements TopRiskStrategy {

    constructor(
        private prisma: PrismaService
    ) {}

    execute(where: Prisma.PurchaseOrderWhereInput){

return this.prisma.product.findMany({

    include: {

        items: {

            where: {

                purchaseOrder: where

            },

            include: {

                fraudAnalysis: true,

                purchaseOrder: true

            }

        }

    }

})}}