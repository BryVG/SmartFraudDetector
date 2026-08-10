
import {Prisma} from '@prisma/client';

export type GroupBy =
    | "hour"
    | "day"
    | "month"
    | "year";

export interface EvolutionPoint {
    period: String;

    total: number;

    fraudulent: number;
}
    
export interface EvolutionStrategy {
    
        execute( where: Prisma.PurchaseOrderWhereInput, groupBy: GroupBy ): Promise<EvolutionPoint[]>;
}