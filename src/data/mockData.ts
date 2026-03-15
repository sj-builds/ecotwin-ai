export interface Building {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  energy: number;
  water: number;
  waste: number;
  score: number;
  status: 'optimal' | 'warning' | 'critical';
}

export interface Alert {
  id: string;
  buildingId: string;
  buildingName: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  recommendation: string;
  timestamp: string;
  resolved: boolean;
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'anomaly' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: string;
  buildingId?: string;
}

export const buildings: Building[] = [
  { id: 'b1', name: 'Science Lab Complex', type: 'Laboratory', x: 25, y: 30, energy: 4520, water: 890, waste: 120, score: 62, status: 'critical' },
  { id: 'b2', name: 'Engineering Block', type: 'Academic', x: 55, y: 20, energy: 3100, water: 650, waste: 85, score: 78, status: 'warning' },
  { id: 'b3', name: 'Central Library', type: 'Academic', x: 45, y: 50, energy: 1800, water: 320, waste: 45, score: 91, status: 'optimal' },
  { id: 'b4', name: 'Student Hostel A', type: 'Residential', x: 75, y: 65, energy: 2800, water: 1200, waste: 200, score: 71, status: 'warning' },
  { id: 'b5', name: 'Admin Building', type: 'Administrative', x: 40, y: 75, energy: 950, water: 180, waste: 30, score: 94, status: 'optimal' },
  { id: 'b6', name: 'Sports Complex', type: 'Recreation', x: 70, y: 35, energy: 2200, water: 950, waste: 60, score: 83, status: 'optimal' },
  { id: 'b7', name: 'Data Center', type: 'Infrastructure', x: 15, y: 60, energy: 8500, water: 200, waste: 15, score: 55, status: 'critical' },
  { id: 'b8', name: 'Student Hostel B', type: 'Residential', x: 85, y: 50, energy: 2600, water: 1100, waste: 190, score: 73, status: 'warning' },
  { id: 'b9', name: 'Cafeteria Complex', type: 'Services', x: 50, y: 40, energy: 1500, water: 800, waste: 350, score: 68, status: 'warning' },
  { id: 'b10', name: 'Research Wing', type: 'Laboratory', x: 30, y: 15, energy: 3800, water: 520, waste: 90, score: 76, status: 'warning' },
];

export const alerts: Alert[] = [
  { id: 'a1', buildingId: 'b1', buildingName: 'Science Lab Complex', issue: 'Anomalous energy spike detected — autoclave running outside schedule', severity: 'high', recommendation: 'Initiate remote shutdown of autoclave systems in Wing B', timestamp: '2026-03-14T08:23:00Z', resolved: false },
  { id: 'a2', buildingId: 'b4', buildingName: 'Student Hostel A', issue: 'Water leak detected — abnormal flow rate at 03:00 AM', severity: 'high', recommendation: 'Dispatch maintenance crew to inspect piping in Block 3', timestamp: '2026-03-14T03:15:00Z', resolved: false },
  { id: 'a3', buildingId: 'b7', buildingName: 'Data Center', issue: 'Cooling system operating at 92% capacity — thermal threshold approaching', severity: 'high', recommendation: 'Activate secondary cooling loop and reduce non-critical server load', timestamp: '2026-03-14T07:45:00Z', resolved: false },
  { id: 'a4', buildingId: 'b3', buildingName: 'Central Library', issue: 'Lights active after midnight in floors 2-4', severity: 'medium', recommendation: 'Override lighting schedule to enforce shutdown at 23:00', timestamp: '2026-03-14T00:30:00Z', resolved: false },
  { id: 'a5', buildingId: 'b9', buildingName: 'Cafeteria Complex', issue: 'Waste bin sensors reporting overflow in Zone C', severity: 'medium', recommendation: 'Schedule additional waste collection for afternoon shift', timestamp: '2026-03-13T16:00:00Z', resolved: true },
  { id: 'a6', buildingId: 'b2', buildingName: 'Engineering Block', issue: 'HVAC running at full capacity in unoccupied labs', severity: 'medium', recommendation: 'Implement occupancy-based HVAC scheduling', timestamp: '2026-03-13T22:10:00Z', resolved: false },
  { id: 'a7', buildingId: 'b8', buildingName: 'Student Hostel B', issue: 'Electricity consumption 40% above baseline after 11 PM', severity: 'low', recommendation: 'Send energy awareness notification to residents', timestamp: '2026-03-13T23:30:00Z', resolved: false },
];

export const aiInsights: AIInsight[] = [
  { id: 'i1', type: 'prediction', title: 'Energy demand surge expected', description: 'ML model predicts 23% increase in campus energy consumption next week due to exam period and extended library hours.', confidence: 89, impact: '+4,200 kWh estimated additional load' },
  { id: 'i2', type: 'anomaly', title: 'Water usage anomaly — Hostel A', description: 'Isolation Forest detected consistent water flow between 02:00-05:00 for 3 consecutive nights. Pattern suggests pipe leak or malfunctioning fixture.', confidence: 94, impact: '~2,400L potential daily waste', buildingId: 'b4' },
  { id: 'i3', type: 'recommendation', title: 'HVAC optimization — Engineering Block', description: 'Reduce HVAC output in Wing B between 02:00-05:00 based on occupancy data. Estimated 18% energy reduction with zero comfort impact.', confidence: 87, impact: '-580 kWh/week savings' },
  { id: 'i4', type: 'prediction', title: 'Solar generation forecast', description: 'Weather model indicates 5 consecutive clear days. Solar panel output expected to cover 35% of daytime campus load.', confidence: 76, impact: '12,000 kWh potential solar generation' },
  { id: 'i5', type: 'recommendation', title: 'Waste route optimization', description: 'Rerouting waste collection trucks using sensor data can reduce diesel consumption by 22% and collection time by 35 minutes.', confidence: 91, impact: '-15L diesel/day, -0.04t CO₂/day' },
  { id: 'i6', type: 'anomaly', title: 'Data Center thermal drift', description: 'Temperature gradient analysis shows uneven cooling distribution. Row 7 racks consistently 4°C above threshold.', confidence: 96, impact: 'Hardware failure risk if uncorrected', buildingId: 'b7' },
];

export const energyTrendData = [
  { month: 'Sep', actual: 28500, predicted: 28000, baseline: 30000 },
  { month: 'Oct', actual: 31200, predicted: 30800, baseline: 30000 },
  { month: 'Nov', actual: 27800, predicted: 28200, baseline: 30000 },
  { month: 'Dec', actual: 22100, predicted: 23000, baseline: 30000 },
  { month: 'Jan', actual: 33500, predicted: 32800, baseline: 30000 },
  { month: 'Feb', actual: 29400, predicted: 29100, baseline: 30000 },
  { month: 'Mar', actual: 26800, predicted: 27500, baseline: 30000 },
];

export const waterUsageData = [
  { month: 'Sep', usage: 45200, recycled: 8500 },
  { month: 'Oct', usage: 48100, recycled: 9200 },
  { month: 'Nov', usage: 42300, recycled: 8800 },
  { month: 'Dec', usage: 35600, recycled: 7200 },
  { month: 'Jan', usage: 50200, recycled: 10500 },
  { month: 'Feb', usage: 46800, recycled: 9800 },
  { month: 'Mar', usage: 43100, recycled: 9100 },
];

export const wasteData = [
  { category: 'Organic', value: 35, color: 'hsl(145, 60%, 50%)' },
  { category: 'Recyclable', value: 28, color: 'hsl(200, 70%, 55%)' },
  { category: 'E-Waste', value: 12, color: 'hsl(55, 70%, 50%)' },
  { category: 'Hazardous', value: 8, color: 'hsl(0, 70%, 55%)' },
  { category: 'General', value: 17, color: 'hsl(280, 60%, 55%)' },
];

export const campusMetrics = {
  totalEnergy: 31870,
  energyTrend: -8.2,
  totalWater: 6810,
  waterTrend: -3.5,
  totalWaste: 1185,
  wasteTrend: -12.1,
  carbonFootprint: 142.5,
  carbonTrend: -6.8,
  sustainabilityScore: 84,
  scoreTrend: 4.2,
};

export const monthlyReport = {
  energyBreakdown: [
    { building: 'Data Center', kwh: 8500, pct: 26.7 },
    { building: 'Science Lab Complex', kwh: 4520, pct: 14.2 },
    { building: 'Research Wing', kwh: 3800, pct: 11.9 },
    { building: 'Engineering Block', kwh: 3100, pct: 9.7 },
    { building: 'Student Hostel A', kwh: 2800, pct: 8.8 },
    { building: 'Student Hostel B', kwh: 2600, pct: 8.2 },
    { building: 'Sports Complex', kwh: 2200, pct: 6.9 },
    { building: 'Central Library', kwh: 1800, pct: 5.6 },
    { building: 'Cafeteria Complex', kwh: 1500, pct: 4.7 },
    { building: 'Admin Building', kwh: 950, pct: 3.0 },
  ],
  carbonTrend: [
    { month: 'Sep', tons: 158 },
    { month: 'Oct', tons: 172 },
    { month: 'Nov', tons: 148 },
    { month: 'Dec', tons: 121 },
    { month: 'Jan', tons: 180 },
    { month: 'Feb', tons: 156 },
    { month: 'Mar', tons: 142 },
  ],
};
