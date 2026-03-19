export function generateForecastFeatures(
  data: { month: string; actual: number }[]
) {
  if (data.length < 3) return null;

  const last = data.slice(-3);

  const growthRate =
    (last[2].actual - last[0].actual) / Math.max(1, last[0].actual);

  const predicted = Math.round(last[2].actual * (1 + growthRate));

  const avg =
    last.reduce((sum, d) => sum + d.actual, 0) / last.length;

  const variance =
    last.reduce((sum, d) => sum + Math.pow(d.actual - avg, 2), 0) /
    last.length;

  const volatility = Math.sqrt(variance);

  return {
    predicted,
    growthRate: Number(growthRate.toFixed(3)),
    volatility: Number(volatility.toFixed(2)),
    recentAverage: Math.round(avg),
  };
}