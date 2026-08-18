import { Injectable } from "@nestjs/common";
import { DashboardFilterDto } from "../dto/dashboard.filter.dto";
import { buildDashboardWhere } from "../utils/filters";
import { getEvolutionPeriod } from "../utils/getEvolutionPeriod";
import { EvolutionFactory } from "../strategy/evolution/EvolutionFactory";
import { BadRequestException } from "@nestjs/common";

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

  if (
    !filters.startDate ||
    !filters.endDate
  ) {
    throw new BadRequestException(
      "startDate e endDate são obrigatórios"
    );
  }

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
}}