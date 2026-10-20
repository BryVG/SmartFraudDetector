
import { GroupBy } from "../strategy/evolution/EvolutionStrategy";

export type EvolutionData = {
  date: Date;
  fraudulent: boolean;
  entityId?: string | number;
};

export type EvolutionPoint = {
  period: string;
  total: number;
  fraudulent: number;
};

type GroupedData = {
  total: number;
  fraudulent: number;
  entities: Map<string, boolean>;
};

export function groupEvolution(
  data: EvolutionData[],
  groupBy: GroupBy
): EvolutionPoint[] {
  const grouped = new Map<string, GroupedData>();

  for (const item of data) {
    const period = getPeriod(item.date, groupBy);

    if (!grouped.has(period)) {
      grouped.set(period, {
        total: 0,
        fraudulent: 0,
        entities: new Map()
      });
    }

    const current = grouped.get(period)!;

    if (item.entityId !== undefined) {
      const id = String(item.entityId);
      const wasFraudulent = current.entities.get(id) ?? false;

      current.entities.set(
        id,
        wasFraudulent || item.fraudulent
      );
    } else {
      current.total++;

      if (item.fraudulent) {
        current.fraudulent++;
      }
    }
  }

  return Array.from(grouped, ([period, data]) => {
    const entities = Array.from(data.entities.values());

    return {
      period,
      total: data.total + entities.length,
      fraudulent:
        data.fraudulent +
        entities.filter(Boolean).length
    };
  });
}

function getPeriod(
  date: Date,
  groupBy: GroupBy
): string {
  switch (groupBy) {
    case "hour":
      return date.toISOString().slice(0, 13);

    case "day":
      return date.toISOString().slice(0, 10);

    case "month":
      return date.toISOString().slice(0, 7);

    case "year":
      return date.toISOString().slice(0, 4);
  }
}
