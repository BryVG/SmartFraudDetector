import { GroupBy } from "../strategy/evolution/EvolutionStrategy";

export function getEvolutionPeriod(
  startDate: Date,
  endDate: Date
): GroupBy {

  const diff =
    endDate.getTime() - startDate.getTime();

  const hours =
    diff / (1000 * 60 * 60);

  const days =
    hours / 24;


  // Até 1 dia → hora
  if (days <= 1) {
    return "hour";
  }


  // Até 7 dias → dia
  if (days <= 7) {
    return "day";
  }


  // Até 1 ano → dia
  if (days <= 365) {
    return "day";
  }


  // Mais de 1 ano → mês
  return "month";
}