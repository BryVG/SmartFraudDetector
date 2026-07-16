import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common'

import { SuppliersService } from './suppliers.service'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'

@Controller('suppliers')
export class SuppliersController {

  constructor(
    private readonly suppliersService: SuppliersService
  ) {}

  @Post()
  create(
    @Body() body: CreateSupplierDto
  ) {
    return this.suppliersService.create(body)
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.suppliersService.findOne(Number(id))
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateSupplierDto
  ) {
    return this.suppliersService.update(
      Number(id),
      body
    )
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.suppliersService.remove(Number(id))
  }
}