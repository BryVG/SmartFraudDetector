import {
  IsOptional,
  IsNumber,
  IsBoolean,
  IsString,
  Length
} from 'class-validator'

export class UpdateFraudAnalysisDto {

  @IsOptional()
  @IsNumber()
  purchaseItemId?: number

  @IsOptional()
  @IsNumber()
  fraudScore?: number

  @IsOptional()
  @IsBoolean()
  suspicious?: boolean

  @IsOptional()
  @IsString()
  @Length(2, 500)
  reason?: string
}