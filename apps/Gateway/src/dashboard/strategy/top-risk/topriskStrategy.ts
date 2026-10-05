
import {Prisma} from '@prisma/client';

export type TopRiskPoint = {
  id: number;
  name: string;
  total: number;
  suspicious: number;
  rate: number;
};
export interface TopRiskStrategy {
    
        execute( where: Prisma.PurchaseOrderWhereInput ): Promise<any>;
}