export function generateAIForecast(data: { month: string; actual: number }[]) {
  // simple trend projection: average growth of last 3 months
  const last = data.slice(-3);
  const growth =
    (last[2].actual - last[0].actual) / Math.max(1, last[0].actual);
  const nextValue = Math.round(last[2].actual * (1 + growth));

  return {
    nextMonth: "Next Month",
    predicted: nextValue,
    confidence: Math.min(95, Math.max(70, Math.round(80 + growth * 50))),
  };
}