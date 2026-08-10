import { DashboardFilterDto } from "../dto/dashboard.filter.dto";

export function buildDashboardWhere(
  filters: DashboardFilterDto
) {

  const where: Prisma.PurchaseOrderWhereInput = {};

  if (
    filters.startDate &&
    filters.endDate
  ) {

    where.createdAt = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate)
    };

  }

  if (filters.supplierId) {

    where.supplierId =
      filters.supplierId;

  }

  if (filters.buyerId) {

    where.buyerId =
      filters.buyerId;

  }

  return where;
}