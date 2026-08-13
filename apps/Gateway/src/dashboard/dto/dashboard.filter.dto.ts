export class DashboardFilterDto {

  startDate?: Date;

  endDate?: Date;

  entity?:
    | "contract"
    | "product"
    | "supplier"
    | "buyer" | string;

 supplierId?: number;

 buyerId?: number;

}