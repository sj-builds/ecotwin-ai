import { Building } from "@/data/mockData";

// ---------------- ANOMALY DETECTION ----------------

export function detectCampusAnomalies(buildings: Building[]) {
  if (!buildings.length) return [];

  const avgEnergy =
    buildings.reduce((sum, b) => sum + b.energy, 0) / buildings.length;

  const avgWater =
    buildings.reduce((sum, b) => sum + b.water, 0) / buildings.length;

  return buildings.filter((b) => {
    const energySpike = b.energy > avgEnergy * 1.4;
    const waterAnomaly = b.water > avgWater * 1.5;
    const poorScore = b.score < 65;
    const critical = b.status === "critical";

    return energySpike || waterAnomaly || poorScore || critical;
  });
}

// ---------------- PREDICTIONS ----------------

export function generateCampusPredictions(buildings: Building[]) {
  return buildings.map((b) => {
    let growth = 1.05;

    // dynamic logic
    if (b.status === "critical") growth += 0.1;
    if (b.occupancy > 70) growth += 0.03;
    if (b.type === "Laboratory") growth += 0.05;

    return {
      buildingId: b.id,
      building: b.name,
      currentEnergy: b.energy,
      predictedEnergy: Math.round(b.energy * growth),
      growthRate: Number(((growth - 1) * 100).toFixed(1)),
    };
  });
}

// ---------------- ALERT GENERATION ----------------

export function generateCampusAlerts(buildings: Building[]) {
  const alerts: any[] = [];

  buildings.forEach((b) => {
    // Critical system
    if (b.status === "critical") {
      alerts.push({
        buildingId: b.id,
        building: b.name,
        message: "Critical system load detected",
        severity: "high",
      });
    }

    // Energy inefficiency
    if (b.energy > 4000 && b.score < 70) {
      alerts.push({
        buildingId: b.id,
        building: b.name,
        message: "High energy consumption with low efficiency score",
        severity: "high",
      });
    }

    // Water anomaly
    if (b.water > 1000) {
      alerts.push({
        buildingId: b.id,
        building: b.name,
        message: "Abnormally high water usage",
        severity: "medium",
      });
    }

    // Waste issue
    if (b.waste > 200) {
      alerts.push({
        buildingId: b.id,
        building: b.name,
        message: "Waste generation exceeding threshold",
        severity: "medium",
      });
    }

    // Efficiency warning
    if (b.score < 75 && b.status === "warning") {
      alerts.push({
        buildingId: b.id,
        building: b.name,
        message: "Building operating below optimal efficiency",
        severity: "low",
      });
    }
  });

  return alerts;
}