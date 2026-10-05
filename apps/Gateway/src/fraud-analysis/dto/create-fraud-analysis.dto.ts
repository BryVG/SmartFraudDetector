import {
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  Length
} from 'class-validator'

export class CreateFraudAnalysisDto {

  @IsNumber()
  purchaseItemId!: number

  @IsNumber()
  fraudScore!: number

  @IsBoolean()
  suspicious!: boolean

  @IsOptional()
  @IsString()
  @Length(2, 500)
  reason?: string
}