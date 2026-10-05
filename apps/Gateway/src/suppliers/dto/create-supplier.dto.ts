import {
  IsString,
  Length
} from 'class-validator'

export class CreateSupplierDto {

  @IsString()
  @Length(2, 100)
  name!: string
}