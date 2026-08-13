
import {Prisma} from '@prisma/client';
import { EvolutionPoint } from "../../utils/groupEvolution";
export type GroupBy =
    | "hour"
    | "day"
    | "month"
    | "year";

    
export interface EvolutionStrategy {
    
        execute( where: Prisma.PurchaseOrderWhereInput, groupBy: GroupBy ): Promise<EvolutionPoint[]>;
}