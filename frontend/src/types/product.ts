
export interface Product {
  id: number;
  name: string;
  StandardUnit?: string;
  StandardMeasure?: string;
}

export interface CreateProductDto {
  name: string;
  StandardUnit: string;
  StandardMeasure: string;
}

export interface UpdateProductDto
  extends Partial<CreateProductDto> {}