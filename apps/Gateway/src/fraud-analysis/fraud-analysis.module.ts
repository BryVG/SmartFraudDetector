import { Module } from '@nestjs/common';
import { FraudAnalysisService } from './fraud-analysis.service';
import { FraudAnalysisController } from './fraud-analysis.controller';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [FraudAnalysisController],
  providers: [FraudAnalysisService],
})
export class FraudAnalysisModule {}
