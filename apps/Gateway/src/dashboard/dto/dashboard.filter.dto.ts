export class DashboardFilterDto {

  startDate?: Date;

  endDate?: Date;

  entity?:
    | "contract"
    | "product"
    | "supplier"
    | "buyer";

 supplierId?: number;

 buyerId?: number;

}