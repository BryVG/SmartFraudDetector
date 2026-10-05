import {
  IsString,
  Length
} from 'class-validator'

export class CreateBuyerDto {

  @IsString()
  @Length(2, 100)
  name!: string
}