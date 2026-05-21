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

describe('PurchaseItems (e2e)', () => {

    let app: INestApplication
    let purchaseItemId: number  

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

    it('/purchaseitems (GET)', () => {

        return request(app.getHttpServer())
            .get('/purchaseitems')
            .expect(200)
    })

    it('/purchaseitems flow', async () => {

            // CREATE BUYER
            const buyer = await request(app.getHttpServer())
            .post('/buyers')
            .send({
                name: 'Reginaldo 7'
            })
            console.log(buyer.body)
            console.log(buyer.text)
            expect(buyer.status).toBe(201)
            const buyerResponse = buyer.body.id

            // CREATE SUPPLIER
            const supplier = await request(app.getHttpServer())
            .post('/suppliers')
            .send({
                name: 'Microsoft 7'
            })
            console.log(supplier.body)
            console.log(supplier.text)
            expect(supplier.status).toBe(201)
            const supplierResponse = supplier.body.id

            // CREATE PRODUCT
            const product = await request(app.getHttpServer())
            .post('/products')
            .send({
                      name: 'Lampada corroida 5',
                      StandardUnit: 'UN',
                      StandardMeasure: 'UN',
            })
            console.log(product.body)
            console.log(product.text)
            expect(product.status).toBe(201)
            const productResponse = product.body.id

            // CREATE PURCHASE ORDER
            const order = await request(app.getHttpServer())
            .post('/purchaseorders')
            .send({
                orderNumber: `ORDER-${Date.now()}`,
                supplierId: supplierResponse,
                buyerId: buyerResponse,
                totalAmount: 2500.0,
            })
            console.log(order.body)
            console.log(order.text)
            expect(order.status).toBe(201)
            const purchaseOrderId = order.body.id

        // CREATE
        const response = await request(app.getHttpServer())
            .post('/purchaseitems')
            .send({
                purchaseOrderId: purchaseOrderId,
                quantity: 50.0,
                productId: productResponse,
                unit: '11',
                Measure: 'kg',
                unitPrice: 50.0,
                totalPrice: 2500.0
            })
        expect(response.status).toBe(201)
        console.log(response.body)
        console.log(response.text)
        purchaseItemId = response.body.id

        // GET BY ID
        await request(app.getHttpServer())
            .get(`/purchaseitems/${purchaseItemId}`)
            .expect(200)

        // UPDATE
    await request(app.getHttpServer())
            .put(`/purchaseitems/${purchaseItemId}`)
            .send({
                quantity: 20.0,
                unit: '11',
                Measure: 'kg',
                unitPrice: 50.0,
                totalPrice: 2500.0
            })
        .expect(200)

    // DELETE
    await request(app.getHttpServer())
            .delete(`/purchaseitems/${purchaseItemId}`)
        .expect(200)
    })
})
