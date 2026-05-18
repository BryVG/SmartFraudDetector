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

  beforeEach(async () => {

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/fraud-analysis (GET)', () => {

    return request(app.getHttpServer())
      .get('/fraud-analysis')
      .expect(200)

  })

  it('/fraud-analysis flow', async () => {

    // CREATE
    const createResponse = await request(app.getHttpServer())
      .post('/fraud-analysis')
      .send({
        fraudScore: 0.1,
        suspicious: false,
        reason: 'Price is expensive',
        purchaseItemId: 1
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