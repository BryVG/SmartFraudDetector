import { EvolutionType } from "../strategy/evolution/EvolutionFactory";

export class DashboardFilterDto {

  startDate?: Date;

  endDate?: Date;

  entity?:
    EvolutionType

 supplierId?: number;

 buyerId?: number;

}