import { Injectable } from "@nestjs/common";
import { DashboardFilterDto } from "../dto/dashboard.filter.dto";
import { buildDashboardWhere } from "../utils/filters";
import { TopRiskFactory } from "../strategy/top-risk/TopRiskFactory";

@Injectable()
export class DashboardTopRiskService {

  constructor(
    private topRiskFactory: TopRiskFactory
  ) {}

  async getTopRisks(
    filters: DashboardFilterDto
  ) {

    const where =
      buildDashboardWhere(filters);
    const entity = filters.entity;
    const strategy =
      this.topRiskFactory.get(
        entity
      );


    return strategy.execute(
      where
    );

  }

}