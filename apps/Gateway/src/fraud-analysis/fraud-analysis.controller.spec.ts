import {
  Test,
  TestingModule
} from '@nestjs/testing'

import {
  FraudAnalysisController
} from './fraud-analysis.controller'

import {
  FraudAnalysisService
} from './fraud-analysis.service'

describe('FraudAnalysisController', () => {

  let controller: FraudAnalysisController

  const mockFraudAnalysisService = {

    create: jest.fn(),

    findAll: jest.fn(),

    findOne: jest.fn(),

    update: jest.fn(),

    remove: jest.fn()
  }

  beforeEach(async () => {

    const module: TestingModule =
      await Test.createTestingModule({

        controllers: [
          FraudAnalysisController
        ],

        providers: [
          {
            provide: FraudAnalysisService,
            useValue: mockFraudAnalysisService
          }
        ]
      }).compile()

    controller =
      module.get<FraudAnalysisController>(
        FraudAnalysisController
      )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {

    it('should create a fraud analysis', async () => {

      const dto = {
        score: 95
      }

      const createdAnalysis = {
        id: 1,
        ...dto
      }

      mockFraudAnalysisService
        .create
        .mockResolvedValue(createdAnalysis)

      const result =
        await controller.create(dto as any)

      expect(result).toEqual(
        createdAnalysis
      )

      expect(
        mockFraudAnalysisService.create
      ).toHaveBeenCalledWith(dto)
    })
  })

  describe('findAll', () => {

    it('should return all analyses', async () => {

      const analyses = [
        { id: 1 }
      ]

      mockFraudAnalysisService
        .findAll
        .mockResolvedValue(analyses)

      const result =
        await controller.findAll()

      expect(result).toEqual(analyses)
    })
  })

  describe('findOne', () => {

    it('should return one analysis', async () => {

      const analysis = {
        id: 1
      }

      mockFraudAnalysisService
        .findOne
        .mockResolvedValue(analysis)

      const result =
        await controller.findOne(1)

      expect(result).toEqual(analysis)

      expect(
        mockFraudAnalysisService.findOne
      ).toHaveBeenCalledWith(1)
    })
  })

  describe('update', () => {

    it('should update analysis', async () => {

      const dto = {
        score: 80
      }

      const updatedAnalysis = {
        id: 1,
        ...dto
      }

      mockFraudAnalysisService
        .update
        .mockResolvedValue(updatedAnalysis)

      const result =
        await controller.update(
          1,
          dto as any
        )

      expect(result).toEqual(
        updatedAnalysis
      )
    })
  })

  describe('remove', () => {

    it('should delete analysis', async () => {

      const deletedAnalysis = {
        id: 1
      }

      mockFraudAnalysisService
        .remove
        .mockResolvedValue(deletedAnalysis)

      const result =
        await controller.remove(1)

      expect(result).toEqual(
        deletedAnalysis
      )
    })
  })
})