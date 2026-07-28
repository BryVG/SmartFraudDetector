
import {
  IsNumber,
  IsString,
} from "class-validator";

export class CreatePurchaseItemDto {

  @IsNumber()
  purchaseOrderId!: number;

  @IsNumber()
  productId!: number;

  @IsNumber()
  quantity!: number;

  @IsString()
  unit!: string;

  @IsString()
  Measure!: string;

  @IsNumber()
  unitPrice!: number;

  @IsNumber()
  totalPrice!: number;
}