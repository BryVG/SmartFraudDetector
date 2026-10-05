import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common'
import { DashboardService } from './dashboard.service'
import { DashboardFilterDto } from './dto/dashboard.filter.dto'
@Controller('dashboard')
export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService
  ) {}

  @Get('cards')
  getCards(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getCards(filters)
  }

  @Get('charts')
  getCharts(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getCharts(filters)
  }

}