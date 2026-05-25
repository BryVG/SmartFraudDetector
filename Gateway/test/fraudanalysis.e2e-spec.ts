import request from 'supertest'

import {
  Test,
  TestingModule
} from '@nestjs/testing'

import {
  INestApplication
} from '@nestjs/common'

import { AppModule } from './../src/app.module'

describe('FraudAnalysis (e2e)', () => {

  let app: INestApplication
  let fraudId: number

  beforeAll(async () => {

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/fraud-analysis (GET)', () => {

    return request(app.getHttpServer())
      .get('/fraud-analysis')
      .expect(200)

  })

  it('/fraud-analysis flow', async () => {

    const unique = Date.now()

    // CREATE BUYER
    const buyer = await request(app.getHttpServer())
      .post('/buyers')
      .send({
        name: `Buyer-${unique}`
      })

    expect(buyer.status).toBe(201)

    const buyerId = buyer.body.id

    // CREATE SUPPLIER
    const supplier = await request(app.getHttpServer())
      .post('/suppliers')
      .send({
        name: `Supplier-${unique}`
      })

    expect(supplier.status).toBe(201)

    const supplierId = supplier.body.id

    // CREATE PRODUCT
    const product = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: `Product-${unique}`,
        StandardUnit: 'UN',
        StandardMeasure: 'UN'
      })

    expect(product.status).toBe(201)

    const productId = product.body.id

    // CREATE PURCHASE ORDER
    const order = await request(app.getHttpServer())
      .post('/purchaseorders')
      .send({
        orderNumber: `ORDER-${unique}`,
        buyerId: buyerId,
        supplierId: supplierId,
        totalAmount: 500
      })

    expect(order.status).toBe(201)

    const purchaseOrderId = order.body.id

    // CREATE PURCHASE ITEM
    const item = await request(app.getHttpServer())
      .post('/purchaseitems')
      .send({
        purchaseOrderId: purchaseOrderId,
        productId: productId,
        quantity: 10,
        unit: 'UN',
        Measure: 'UN',
        unitPrice: 50,
        totalPrice: 500
      })

    expect(item.status).toBe(201)

    const purchaseItemId = item.body.id

    // CREATE FRAUD ANALYSIS
    const createResponse = await request(app.getHttpServer())
      .post('/fraud-analysis')
      .send({
        fraudScore: 0.1,
        suspicious: false,
        reason: 'Price is expensive',
        purchaseItemId: purchaseItemId
      })

    expect(createResponse.status).toBe(201)

    fraudId = createResponse.body.id

    // GET BY ID
    await request(app.getHttpServer())
      .get(`/fraud-analysis/${fraudId}`)
      .expect(200)

    // UPDATE
    await request(app.getHttpServer())
      .put(`/fraud-analysis/${fraudId}`)
      .send({
        fraudScore: 0.99,
        suspicious: true,
        reason: 'Updated'
      })
      .expect(200)

    // DELETE
    await request(app.getHttpServer())
      .delete(`/fraud-analysis/${fraudId}`)
      .expect(200)

  })

})