import { Injectable } from "@nestjs/common";
import { EvolutionStrategy } from "./EvolutionStrategy";
import { SupplierStrategy } from "./supplierStrategy";
import { ProductEvolutionStrategy } from "./ProductStrategy";
import { ContractEvolutionStrategy } from "./ContractsStrategy";

@Injectable()
export class EvolutionFactory {
  
    constructor(
        private supplier: SupplierStrategy,
        private product: ProductEvolutionStrategy,
        private contract: ContractEvolutionStrategy
    ) {}
    
    get(type: string): EvolutionStrategy{
        const map={
            supplier:this.supplier,
            product:this.product,
            contract:this.contract
        }
        return map[type];
        
        }
    
}

