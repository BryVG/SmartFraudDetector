import { Prisma } from "@prisma/client";

export interface TopRiskStrategy {

    execute(
        where: Prisma.PurchaseOrderWhereInput
    ): Promise<any>;

}