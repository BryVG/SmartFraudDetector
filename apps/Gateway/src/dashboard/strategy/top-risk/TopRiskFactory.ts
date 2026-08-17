import { Injectable } from "@nestjs/common";
import { TopRiskStrategy, TopRiskType } from "./topriskStrategy";
import { SupplierStrategy } from "./supplierStrategy";
import { ProductStrategy } from "./productStrategy";
import { BuyerStrategy } from "./buyerStrategy";
import { EvolutionStrategy } from "../evolution/EvolutionStrategy";

export type TopRiskPoint = {
  id: number;
  name: string;
  total: number;
  suspicious: number;
  rate: number;
};
@Injectable()
export class TopRiskFactory {
  
    constructor(
        private supplier: SupplierStrategy,
        private product: ProductStrategy,
        private buyer: BuyerStrategy
    ) {}

    get(type: TopRiskType): TopRiskStrategy{
        const map={
            supplier:this.supplier,
            product:this.product,
            buyer:this.buyer
        }
        return map[type];
        }
}