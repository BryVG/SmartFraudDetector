import {
  IsOptional,
  IsString,
  Length
} from 'class-validator'

export class UpdateSupplierDto {

  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string
}