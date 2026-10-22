
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { CardService } from './services/dashboard-cards.service';
import { DashboardChartsService } from './services/dashboard-charts.service';

import { TopRiskFactory } from './strategy/top-risk/TopRiskFactory';
import { EvolutionFactory } from './strategy/evolution/EvolutionFactory';

import { SupplierStrategy } from './strategy/evolution/SupplierStrategy';
import { ProductEvolutionStrategy } from './strategy/evolution/ProductStrategy';
import { ContractEvolutionStrategy } from './strategy/evolution/ContractsStrategy';

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    CardService,
    DashboardChartsService,
    TopRiskFactory,
    EvolutionFactory,
    SupplierStrategy,
    ProductEvolutionStrategy,
    ContractEvolutionStrategy,
  ],
})
export class DashboardModule {}
