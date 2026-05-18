import request from 'supertest'

import {
  Test,
  TestingModule
} from '@nestjs/testing'

import {
  INestApplication
} from '@nestjs/common'

import { AppModule }
from './../src/app.module'
import { response } from 'express'

describe('Suppliers (e2e)', () => {

  let app: INestApplication

  beforeEach(async () => {

    const moduleFixture:
    TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile()

    app =
      moduleFixture.createNestApplication()

    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/suppliers (GET)', () => {

    return request(app.getHttpServer())
      .get('/suppliers')
      .expect(200)

  })

  it('/suppliers/:id (GET)', () => {

    return request(app.getHttpServer())
      .get('/suppliers/1')
      .expect(200)

  })
let supplierId: number

it('/suppliers (POST)', async () => {

  const response = await request(app.getHttpServer())
    .post('/suppliers')
    .send({
      name: 'ONG 1'
    })

  supplierId = response.body.id
  console.log(response.body)
  expect(response.status).toBe(201)

})

it('/suppliers/:id (PUT)', () => {

  return request(app.getHttpServer())
    .put(`/suppliers/${supplierId}`)
    .send({
      name: 'ONG 1 TEST'
    })
    .expect(200)

})

  it('/suppliers/:id (DELETE)', () => {

    return request(app.getHttpServer())
      .delete(`/suppliers/${supplierId}`)
      .expect(200)

  })

})