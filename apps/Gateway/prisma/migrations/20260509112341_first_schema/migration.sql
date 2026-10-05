BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[PurchaseOrder] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orderNumber] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PurchaseOrder_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [buyerId] INT,
    [supplierId] INT NOT NULL,
    [totalAmount] FLOAT(53),
    CONSTRAINT [PurchaseOrder_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PurchaseOrder_orderNumber_key] UNIQUE NONCLUSTERED ([orderNumber])
);

-- CreateTable
CREATE TABLE [dbo].[PurchaseItem] (
    [id] INT NOT NULL IDENTITY(1,1),
    [purchaseOrderId] INT NOT NULL,
    [productId] INT NOT NULL,
    [quantity] FLOAT(53) NOT NULL,
    [unitPrice] FLOAT(53) NOT NULL,
    [totalPrice] FLOAT(53) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PurchaseItem_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PurchaseItem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Supplier] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Supplier_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Buyer] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Buyer_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FraudAnalysis] (
    [id] INT NOT NULL IDENTITY(1,1),
    [purchaseItemId] INT NOT NULL,
    [fraudScore] FLOAT(53) NOT NULL,
    [suspicious] BIT NOT NULL,
    [reason] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [FraudAnalysis_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [FraudAnalysis_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [FraudAnalysis_purchaseItemId_key] UNIQUE NONCLUSTERED ([purchaseItemId])
);

-- AddForeignKey
ALTER TABLE [dbo].[PurchaseOrder] ADD CONSTRAINT [PurchaseOrder_buyerId_fkey] FOREIGN KEY ([buyerId]) REFERENCES [dbo].[Buyer]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PurchaseOrder] ADD CONSTRAINT [PurchaseOrder_supplierId_fkey] FOREIGN KEY ([supplierId]) REFERENCES [dbo].[Supplier]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PurchaseItem] ADD CONSTRAINT [PurchaseItem_purchaseOrderId_fkey] FOREIGN KEY ([purchaseOrderId]) REFERENCES [dbo].[PurchaseOrder]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PurchaseItem] ADD CONSTRAINT [PurchaseItem_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[Product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FraudAnalysis] ADD CONSTRAINT [FraudAnalysis_purchaseItemId_fkey] FOREIGN KEY ([purchaseItemId]) REFERENCES [dbo].[PurchaseItem]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
