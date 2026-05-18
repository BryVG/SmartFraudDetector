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

describe('Products (e2e)', () => {

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

  it('/products (GET)', () => {

    return request(app.getHttpServer())
      .get('/products')
      .expect(200)

  })

  it('/products/:id (GET)', () => {

    return request(app.getHttpServer())
      .get('/products/1')
      .expect(200)

  })
let productId: number

it('/products (POST)', async () => {

  const response = await request(app.getHttpServer())
    .post('/products')
    .send({
      name: 'Lampada Neutra',
      StandardUnit: 'UN',
      StandardMeasure: 'UN',
    })

  productId = response.body.id
  console.log(response.body)
  expect(response.status).toBe(201)

})

it('/products/:id (PUT)', () => {

  return request(app.getHttpServer())
    .put(`/products/${productId}`)
    .send({
      name: 'lampada Updated',
      StandardUnit: "KG",
    })
    .expect(200)

})

  it('/products/:id (DELETE)', () => {

    return request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .expect(200)

  })

})