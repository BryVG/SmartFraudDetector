import { Injectable } from "@nestjs/common";
import { EvolutionStrategy } from "./EvolutionStrategy";
import { SupplierStrategy } from "./SupplierStrategy";
import { ProductEvolutionStrategy } from "./ProductStrategy";
import { ContractEvolutionStrategy } from "./ContractsStrategy";

export type EvolutionType = 
    "supplier" 
    | "product" 
    | "contract"
;
@Injectable()
export class EvolutionFactory {
  
    constructor(
        private supplier: SupplierStrategy,
        private product: ProductEvolutionStrategy,
        private contract: ContractEvolutionStrategy
    ) {}
    
    get(type: EvolutionType): EvolutionStrategy{
        const map={
            supplier:this.supplier,
            product:this.product,
            contract:this.contract
        }
        return map[type];
        
        }
    
}

