import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const supplier = await prisma.supplier.create({
    data: {
      name: "Fornecedor ABC"
    }
  })

  const buyer = await prisma.buyer.create({
    data: {
      name: "Bryan"
    }
  })

  const product = await prisma.product.create({
    data: {
      name: "Notebook",
      StandardUnit: "100",
      StandardMeasure: "UN"
    }
  })

  const order = await prisma.purchaseOrder.create({
    data: {
      orderNumber: "PED-001",

      supplierId: supplier.id,

      buyerId: buyer.id,

      totalAmount: 10000,

      items: {
        create: [
          {
            quantity: 2,

            unitPrice: 5000,

            totalPrice: 10000,

            unit: "5000",
            Measure: "ML",

            productId: product.id
          }
        ]
      }
    }
  })

  console.log(order)
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })