
import {Injectable} from '@nestjs/common';
import { PrismaService } from '../../prisma/Prisma.service';
import { DashboardFilterDto } from './dto/dashboard.filter.dto';
import { buildDashboardWhere } from './utils/filters';

@Injectable()
export class dashboardCharts{
    constructor(
        private prisma: PrismaService,
    ) {}

    async getEvalutionDistribution(filters: DashboardFilterDto) {
        const where =
                buildDashboardWhere(filters);
                
    }
    async getRiskDistribution(filters: DashboardFilterDto) {

         const where =
                buildDashboardWhere(filters);
        
          
        const [low, medium, high, critical] = await Promise.all([
             this.prisma.fraudAnalysis.count({
                where: {
                    ...where,
                    score: {gte: 0, lt: 50}
                }
            }),
            this.prisma.fraudAnalysis.count({
                where: {
                    ...where,
                    score: {gte: 50, lt: 80}
                }
            }),
            this.prisma.fraudAnalysis.count({
                where: {
                    ...where,
                    score: {gte: 80, lt: 100}
                }
            }),
            this.prisma.fraudAnalysis.count({
                where: {
                    ...where,
                    score: {gte: 100}
                }
            })
        ]);
        return [{value: low, risk: 'LOW'}, {value: medium, risk: 'MEDIUM'}, {value: high, risk: 'HIGH'}, {value: critical, risk: 'CRITICAL'}];}
    }



