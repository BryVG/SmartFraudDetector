import request from 'supertest'

import {
  Test,
  TestingModule
} from '@nestjs/testing'

import {
  INestApplication
} from '@nestjs/common'

import { AppModule }
from '../src/app.module'
import { response } from 'express'

describe('Buyers (e2e)', () => {

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

  it('/buyers (GET)', () => {

    return request(app.getHttpServer())
      .get('/buyers')
      .expect(200)

  })

  it('/buyers/:id (GET)', () => {

    return request(app.getHttpServer())
      .get('/buyers/1')
      .expect(200)

  })
let buyerId: number

it('/buyers (POST)', async () => {

  const response = await request(app.getHttpServer())
    .post('/buyers')
    .send({
      name: 'VINI MEN'
    })

  buyerId = response.body.id
  console.log(response.body)
  expect(response.status).toBe(201)

})

it('/buyers/:id (PUT)', () => {

  return request(app.getHttpServer())
    .put(`/buyers/${buyerId}`)
    .send({
      name: 'Bryan Updated'
    })
    .expect(200)

})

  it('/buyers/:id (DELETE)', () => {

    return request(app.getHttpServer())
      .delete(`/buyers/${buyerId}`)
      .expect(200)

  })

})