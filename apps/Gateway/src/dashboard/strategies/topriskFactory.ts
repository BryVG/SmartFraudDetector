import {injectable} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../../prisma/Prisma.service";

export class TopRiskFactory {
    constructor(
        private: SupplierStrategy,
        private: BuyerStrategy, 
        private: ProductStrategy
    ) {}  
   get(type: string){
        const map = {
            supplier: this.supplier,
            buyer: this.buyer,
            product: this.product
        };
        return map[type];
        
   }
}