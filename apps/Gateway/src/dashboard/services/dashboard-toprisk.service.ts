import { Injectable } from "@nestjs/common";
import { DashboardFilterDto } from "../dto/dashboard.filter.dto";
import { buildDashboardWhere } from "../utils/filters";
import { TopRiskFactory } from "../strategy/top-risk/TopRiskFactory";
import { TopRiskType } from "../strategy/top-risk/TopRiskFactory";

@Injectable()
export class DashboardTopRiskService {

  constructor(
    private topRiskFactory: TopRiskFactory
  ) {}

  async getTopRisks(
    filters: DashboardFilterDto,
    type: TopRiskType
  ) {

    const where =
      buildDashboardWhere(filters);
    const strategy =
      this.topRiskFactory.get(
        type
      );


    return strategy.execute(
      where
    );

  }

}