import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common'
import { DashboardService } from './dashboard.service'
@Controller('dashboard')
export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService
  ) {}

  @Get()
  findAll() {
    return this.dashboardService.getCards()
  }

  @Get('charts')
  getCharts() {
    return this.dashboardService.getCharts()
  }

}