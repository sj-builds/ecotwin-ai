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

export function detectAnomalies(
  data: { month: string; actual: number }[]
) {
  if (data.length < 5) return [];

  const values = data.map(d => d.actual);

  const mean =
    values.reduce((sum, v) => sum + v, 0) / values.length;

  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) /
    values.length;

  const std = Math.sqrt(variance);

  return data.filter(d => {
    const z = (d.actual - mean) / std;
    return Math.abs(z) > 1.5; // anomaly threshold
  });
}

export function generatePredictions(
  data: { month: string; actual: number }[]
) {
  if (data.length < 3) return null;

  const last = data.slice(-3);

  const growth =
    (last[2].actual - last[0].actual) /
    Math.max(1, last[0].actual);

  const nextValue = Math.round(last[2].actual * (1 + growth));

  return {
    nextMonth: "Next Month",
    predicted: nextValue,
    growthRate: Number(growth.toFixed(2)),
  };
}

export function generateAlerts({
  anomalies,
  prediction,
}: {
  anomalies: any[];
  prediction: any;
}) {
  const alerts: any[] = [];

  // Anomaly alerts
  anomalies.forEach((a) => {
    alerts.push({
      type: "anomaly",
      message: `Unusual energy spike detected in ${a.month}`,
      severity: "high",
    });
  });

  // Prediction alert
  if (prediction && prediction.growthRate > 0.1) {
    alerts.push({
      type: "prediction",
      message: `Energy expected to increase by ${
        prediction.growthRate * 100
      }% next month`,
      severity: "medium",
    });
  }

  return alerts;
}