export class DashboardFilterDto {

    start?: string;

    end?: string;

    period?: "today"
            | "week"
            | "month"
            | "year";

    supplierId?: number;

    buyerId?: number;

}