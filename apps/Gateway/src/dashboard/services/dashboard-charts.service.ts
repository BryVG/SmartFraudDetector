import { Injectable } from "@nestjs/common";
import { DashboardFilterDto } from "../dto/dashboard.filter.dto";
import { buildDashboardWhere } from "../utils/filters";
import { getEvolutionPeriod } from "../utils/getEvolutionPeriod";
import { EvolutionFactory } from "../strategy/evolution/EvolutionFactory";

@Injectable()
export class DashboardChartsService {

  constructor(
    private evolutionFactory: EvolutionFactory
  ) {}

  async getEvolution(
    filters: DashboardFilterDto
  ) {

    const where =
      buildDashboardWhere(filters);


    const groupBy =
      getEvolutionPeriod(
        filters.startDate,
        filters.endDate
      );


    const strategy =
      this.evolutionFactory.get(
        filters.entity
      );


    return strategy.execute(
      where,
      groupBy
    );

  }

}