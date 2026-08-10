import {DashboardFilterDto} from "../dto/dashboard.filter.dto";

export function buildDashboardWhere(filters: DashboardFilterDto) {
  
    const where: any = {}

    if (filters.start && filters.end) {
        where.purchaseDate = {
            gte: new Date(filters.start),
            lte: new Date(filters.end)
        }
    }
    if (filters.buyerId) {
        where.buyerId = filters.buyerId;
    }
    if (filters.supplierId) {
        where.supplierId = filters.supplierId;
    }
    return where;

}