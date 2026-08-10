import { GroupBy } from "../strategy/evolution/EvolutionStrategy";

export type EvolutionData = {
date: Date;
fraudulent: boolean;
};

export type EvolutionPoint = {
period: string;
total: number;
fraudulent: number;
};

export function groupEvolution(
data: EvolutionData[],
groupBy: GroupBy
): EvolutionPoint[] {

const grouped =
new Map<
string,
{
total: number;
fraudulent: number;
}
>();

for (const item of data) {

const period =
  getPeriod(
    item.date,
    groupBy
  );

if (!grouped.has(period)) {

  grouped.set(period, {
    total: 0,
    fraudulent: 0
  });

}

const current =
  grouped.get(period)!;

current.total++;

if (item.fraudulent) {
  current.fraudulent++;
}

}

return Array.from(
grouped,
([period, data]) => ({
period,
...data
})
);

}

function getPeriod(
date: Date,
groupBy: GroupBy
): string {

switch (groupBy) {

case "hour":

  return date
    .toISOString()
    .slice(0, 13);

case "day":

  return date
    .toISOString()
    .slice(0, 10);

case "month":

  return date
    .toISOString()
    .slice(0, 7);

case "year":

  return date
    .toISOString()
    .slice(0, 4);


}

}
