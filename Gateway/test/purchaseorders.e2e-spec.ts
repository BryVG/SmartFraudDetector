import request from 'supertest'

import {
    Test,
    TestingModule
} from '@nestjs/testing'

import {
    INestApplication
} from '@nestjs/common'

import { AppModule } from './../src/app.module'
import { PurchaseOrder } from 'src/purchase-orders/entities/purchase-order.entity'

describe('PurchaseOrders (e2e)', () => {

    let app: INestApplication
    let purchaseOrderId: number  
    const unique = Date.now()

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

    it('/purchaseorders (GET)', () => {

        return request(app.getHttpServer())
            .get('/purchaseorders')
            .expect(200)
    })

    it('/purchaseorders flow', async () => {

            // CREATE BUYER
            const buyer = await request(app.getHttpServer())
            .post('/buyers')
            .send({
                name: `Buyer-${unique}`
            })
            console.log(buyer.body)
            console.log(buyer.text)
            expect(buyer.status).toBe(201)
            const buyerResponse = buyer.body.id

            // CREATE SUPPLIER
            const supplier = await request(app.getHttpServer())
            .post('/suppliers')
            .send({
                name: `Supplier-${unique}`
            })
            console.log(supplier.body)
            console.log(supplier.text)
            expect(supplier.status).toBe(201)
            const supplierResponse = supplier.body.id

            // CREATE PURCHASE ORDER
            const order = await request(app.getHttpServer())
            .post('/purchaseorders')
            .send({
                orderNumber: `ORDER-${unique}`,
                supplierId: supplierResponse,
                buyerId: buyerResponse,
                totalAmount: 2700.0,
            })
            console.log(order.body)
            console.log(order.text)
            expect(order.status).toBe(201)
            purchaseOrderId = order.body.id

        // GET BY ID
        await request(app.getHttpServer())
            .get(`/purchaseorders/${purchaseOrderId}`)
            .expect(200)

        // UPDATE
    await request(app.getHttpServer())
            .put(`/purchaseorders/${purchaseOrderId}`)
            .send({
                orderNumber: `ORDER-${unique}`,
                totalAmount: 2800.0,
            })
        .expect(200)

    // DELETE
    await request(app.getHttpServer())
            .delete(`/purchaseorders/${purchaseOrderId}`)
        .expect(200)
    })
})
