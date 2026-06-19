import {
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateProductDto {

  @IsString()
  name!: string

  @IsOptional()
  @IsString()
  StandardUnit?: string

  @IsOptional()
  @IsString()
  StandardMeasure?: string
}