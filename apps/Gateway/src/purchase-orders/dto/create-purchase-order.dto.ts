import {
  IsString,
  IsNumber,
  IsOptional,
  Length
} from 'class-validator'

export class CreatePurchaseOrderDto {

  @IsString()
  @Length(1, 50)
  orderNumber!: string

  @IsOptional()
  @IsNumber()
  buyerId!: number

  @IsNumber()
  supplierId!: number

  @IsOptional()
  @IsNumber()
  totalAmount?: number
}