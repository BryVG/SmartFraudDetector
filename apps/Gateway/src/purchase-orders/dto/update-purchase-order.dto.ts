import {
  IsOptional,
  IsString,
  IsNumber,
  Length
} from 'class-validator'

export class UpdatePurchaseOrderDto {

  @IsOptional()
  @IsString()
  @Length(1, 50)
  orderNumber?: string

  @IsOptional()
  @IsNumber()
  buyerId?: number

  @IsOptional()
  @IsNumber()
  supplierId?: number

  @IsOptional()
  @IsNumber()
  totalAmount?: number
}