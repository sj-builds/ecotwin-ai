export function localAI({ input, context, type }: any) {
  const buildings = context?.buildings || [];

  // ---------- ANALYSIS MODE ----------
  if (type === "analysis") {
    const insights: any[] = [];

    buildings.forEach((b: any) => {
      // anomaly
      if (b.status === "critical") {
        insights.push({
          type: "anomaly",
          title: `${b.name} critical load`,
          description: `${b.name} is operating under critical conditions with ${b.energy} kWh consumption and low efficiency score (${b.score}).`,
          impact: "High",
          confidence: 85,
        });
      }

      // inefficiency
      if (b.energy > 4000 && b.score < 70) {
        insights.push({
          type: "recommendation",
          title: `Optimize ${b.name}`,
          description: `High energy usage (${b.energy} kWh) with poor sustainability score (${b.score}). Optimize HVAC and usage patterns.`,
          impact: "Medium",
          confidence: 80,
        });
      }

      // prediction
      if (b.type === "Laboratory") {
        insights.push({
          type: "prediction",
          title: `${b.name} energy increase`,
          description: `Lab usage trends indicate ~10% increase in energy demand.`,
          impact: "Medium",
          confidence: 75,
        });
      }
    });

    return insights;
  }

  // ---------- CHAT MODE ----------
  return [
    {
      type: "chat",
      reply:
        "Based on campus data, some buildings show inefficiencies. Consider optimizing HVAC and energy usage.",
    },
  ];
}