import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common'

import { FraudAnalysisService } from './fraud-analysis.service'
import { CreateFraudAnalysisDto } from './dto/create-fraud-analysis.dto'
import { UpdateFraudAnalysisDto } from './dto/update-fraud-analysis.dto'
import { ParseIntPipe } from '@nestjs/common'
@Controller('fraud-analysis')
export class FraudAnalysisController {

  constructor(
    private readonly fraudAnalysisService: FraudAnalysisService
  ) {}

  @Post()
  create(
    @Body() body: CreateFraudAnalysisDto
  ) {
    return this.fraudAnalysisService.create(body)
  }

  @Get()
  findAll() {
    return this.fraudAnalysisService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.fraudAnalysisService.findOne(Number(id))
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() body: UpdateFraudAnalysisDto
  ) {
    return this.fraudAnalysisService.update(
      Number(id),
      body
    )
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number
  ) {
    return this.fraudAnalysisService.remove(Number(id))
  }
}