import {
  Test,
  TestingModule
} from '@nestjs/testing'

import {
  NotFoundException
} from '@nestjs/common'

import {
  FraudAnalysisService
} from './fraud-analysis.service'

import {
  PrismaService
} from '../../prisma/Prisma.service'

describe('FraudAnalysisService', () => {

  let service: FraudAnalysisService

  const mockPrismaService = {

    fraud_analysi: {

      create: jest.fn(),

      findMany: jest.fn(),

      findUnique: jest.fn(),

      update: jest.fn(),

      delete: jest.fn()
    }
  }

  beforeEach(async () => {

    const module: TestingModule =
      await Test.createTestingModule({

        providers: [
          FraudAnalysisService,

          {
            provide: PrismaService,
            useValue: mockPrismaService
          }
        ]
      }).compile()

    service =
      module.get<FraudAnalysisService>(
        FraudAnalysisService
      )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {

    it('should return all analyses', async () => {

      const analyses = [
        {
          id: 1,
          score: 90
        }
      ]

      mockPrismaService
        .fraud_analysi
        .findMany
        .mockResolvedValue(analyses)

      const result =
        await service.findAll()

      expect(result).toEqual(analyses)

      expect(
        mockPrismaService
          .fraud_analysi
          .findMany
      ).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {

    it('should return one analysis', async () => {

      const analysis = {
        id: 1,
        score: 90
      }

      mockPrismaService
        .fraud_analysi
        .findUnique
        .mockResolvedValue(analysis)

      const result =
        await service.findOne(1)

      expect(result).toEqual(analysis)
    })

    it('should throw NotFoundException', async () => {

      mockPrismaService
        .fraud_analysi
        .findUnique
        .mockResolvedValue(null)

      await expect(
        service.findOne(999)
      ).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('create', () => {

    it('should create analysis', async () => {

      const dto = {
        score: 95
      }

      const createdAnalysis = {
        id: 1,
        ...dto
      }

      mockPrismaService
        .fraud_analysi
        .create
        .mockResolvedValue(createdAnalysis)

      const result =
        await service.create(dto as any)

      expect(result).toEqual(
        createdAnalysis
      )
    })
  })

  describe('remove', () => {

    it('should delete analysis', async () => {

      const analysis = {
        id: 1
      }

      mockPrismaService
        .fraud_analysi
        .findUnique
        .mockResolvedValue(analysis)

      mockPrismaService
        .fraud_analysi
        .delete
        .mockResolvedValue(analysis)

      const result =
        await service.remove(1)

      expect(result).toEqual(
        analysis
      )
    })
  })
})