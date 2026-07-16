/*
  Warnings:

  - A unique constraint covering the columns `[purchaseOrderId,productId]` on the table `PurchaseItem` will be added. If there are existing duplicate values, this will fail.
  - Made the column `buyerId` on table `PurchaseOrder` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[PurchaseOrder] DROP CONSTRAINT [PurchaseOrder_buyerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Product] ADD [StandardMeasure] NVARCHAR(1000),
[StandardUnit] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[PurchaseItem] ADD [Measure] NVARCHAR(1000),
[unit] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[PurchaseOrder] ALTER COLUMN [buyerId] INT NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [FraudAnalysis_suspicious_idx] ON [dbo].[FraudAnalysis]([suspicious]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [FraudAnalysis_createdAt_idx] ON [dbo].[FraudAnalysis]([createdAt]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PurchaseItem_productId_idx] ON [dbo].[PurchaseItem]([productId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PurchaseItem_purchaseOrderId_idx] ON [dbo].[PurchaseItem]([purchaseOrderId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PurchaseItem_createdAt_idx] ON [dbo].[PurchaseItem]([createdAt]);

-- CreateIndex
ALTER TABLE [dbo].[PurchaseItem] ADD CONSTRAINT [PurchaseItem_purchaseOrderId_productId_key] UNIQUE NONCLUSTERED ([purchaseOrderId], [productId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PurchaseOrder_supplierId_idx] ON [dbo].[PurchaseOrder]([supplierId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PurchaseOrder_buyerId_idx] ON [dbo].[PurchaseOrder]([buyerId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [PurchaseOrder_createdAt_idx] ON [dbo].[PurchaseOrder]([createdAt]);

-- AddForeignKey
ALTER TABLE [dbo].[PurchaseOrder] ADD CONSTRAINT [PurchaseOrder_buyerId_fkey] FOREIGN KEY ([buyerId]) REFERENCES [dbo].[Buyer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
