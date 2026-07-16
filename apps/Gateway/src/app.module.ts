import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { BuyersModule } from './buyers/buyers.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { PurchaseItemsModule } from './purchase-items/purchase-items.module';
import { FraudAnalysisModule } from './fraud-analysis/fraud-analysis.module';
import { MetadataModule } from './metadata/metadata.module';


@Module({
  imports: [MetadataModule, SuppliersModule, BuyersModule, PurchaseOrdersModule, PurchaseItemsModule, FraudAnalysisModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
