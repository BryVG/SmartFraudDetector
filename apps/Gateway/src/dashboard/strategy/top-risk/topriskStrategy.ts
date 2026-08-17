
import {Prisma} from '@prisma/client';

export type TopRiskType =
  | "supplier"
  | "product"
  | "buyer";
  
export interface TopRiskStrategy {
    
        execute( where: Prisma.PurchaseOrderWhereInput ): Promise<any>;
}