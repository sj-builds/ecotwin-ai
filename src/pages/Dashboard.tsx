import { motion } from "framer-motion";
import { Zap, Droplets, Trash2, CloudRain, Gauge } from "lucide-react";
import MetricCard  from "@/components/MetricCard";
import { AlertItem } from "@/components/AlertItem";
import { DashboardLayout } from "@/components/DashboardLayout";

import {
  campusMetrics,
  energyTrendData,
  wasteData,
  alerts,
  aiInsights,
} from "@/data/mockData";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";

/* ---------------- AI Forecast Simulation ---------------- */

function generateAIForecast(data: { month: string; actual: number }[]) {

  const last = data.slice(-3);

  const growth =
    (last[2].actual - last[0].actual) /
    Math.max(1, last[0].actual);

  const predicted = Math.round(last[2].actual * (1 + growth));

  return {
    predicted,
    confidence: Math.min(95, Math.max(70, Math.round(80 + growth * 50))),
  };
}

/* ---------------- Tooltip ---------------- */

const CustomTooltip = ({ active, payload, label }: any) => {

  if (!active || !payload) return null;

  return (
    <div className="bg-card border border-border rounded-md p-3 text-xs font-mono">

      <p className="text-muted-foreground mb-1">{label}</p>

      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}

    </div>
  );
};

/* ---------------- Dashboard ---------------- */

export default function Dashboard() {

  const topAlerts = alerts.filter(a => !a.resolved).slice(0,3);
  const topInsights = aiInsights.slice(0,3);

  const forecast = generateAIForecast(
    energyTrendData.map(d => ({
      month:d.month,
      actual:d.actual
    }))
  );

  return (

    <DashboardLayout>

      <div className="space-y-8 max-w-[1400px]">


        {/* Header */}

        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          className="flex items-end justify-between"
        >

          <div>

            <h1 className="text-2xl font-light tracking-display text-foreground">
              Sustainability Dashboard
            </h1>

            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">

              Campus overview — {new Date().toLocaleDateString()}

            </p>

            <span className="text-green-500 text-xs font-mono">
              ● Live Data
            </span>

          </div>


          <div className="bg-card border border-border rounded-md px-4 py-2 flex items-center gap-2">

            <Gauge className="h-4 w-4 text-primary"/>

            <span className="text-xs font-mono text-muted-foreground uppercase">
              Score
            </span>

            <span className="text-2xl font-light tracking-display text-primary tabular-nums">
              {campusMetrics.sustainabilityScore}
            </span>

            <span className="text-xs font-mono text-primary">/100</span>

          </div>

        </motion.div>


        {/* Metrics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          <MetricCard
            label="Energy"
            value={campusMetrics.totalEnergy}
            unit="kWh"
            trend={campusMetrics.energyTrend}
            icon={Zap}
          />

          <MetricCard
            label="Water"
            value={campusMetrics.totalWater}
            unit="m³"
            trend={campusMetrics.waterTrend}
            icon={Droplets}
          />

          <MetricCard
            label="Waste"
            value={campusMetrics.totalWaste}
            unit="kg"
            trend={campusMetrics.wasteTrend}
            icon={Trash2}
          />

          <MetricCard
            label="Carbon"
            value={campusMetrics.carbonFootprint}
            unit="tons"
            trend={campusMetrics.carbonTrend}
            icon={CloudRain}
          />

          <MetricCard
            label="Score"
            value={campusMetrics.sustainabilityScore}
            unit="pts"
            trend={campusMetrics.scoreTrend}
            icon={Gauge}
          />

        </div>


        {/* AI Forecast */}

        <div className="bg-card border border-border rounded-md p-5">

          <p className="text-xs font-mono uppercase text-muted-foreground">
            AI Energy Forecast
          </p>

          <p className="text-2xl font-light text-primary tabular-nums">
            {forecast.predicted.toLocaleString()} kWh
          </p>

          <p className="text-xs text-muted-foreground font-mono">
            Confidence: {forecast.confidence}%
          </p>

        </div>


        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">


          {/* Energy Trend */}

          <div className="lg:col-span-2 bg-card border border-border rounded-md p-5">

            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Energy Consumption Trend
            </h3>

            <ResponsiveContainer width="100%" height={240}>

              <AreaChart data={energyTrendData}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="month"/>
                <YAxis/>

                <Tooltip content={<CustomTooltip/>}/>

                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#888"
                  fill="#888"
                  strokeDasharray="4 4"
                />

                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                />

                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#22c55e"
                  fill="#22c55e"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>


          {/* Waste Pie */}

          <div className="bg-card border border-border rounded-md p-5">

            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Waste Distribution
            </h3>

            <ResponsiveContainer width="100%" height={240}>

              <PieChart>

                <Pie
                  data={wasteData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                >

                  {wasteData.map((entry,i)=>(
                    <Cell key={i} fill={entry.color}/>
                  ))}

                </Pie>

                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Alerts + AI Insights */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


          {/* Alerts */}

          <div className="bg-card border border-border rounded-md p-5">

            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Active Alerts
            </h3>

            <div className="space-y-3">

              {topAlerts.map((alert,i)=>(
                <AlertItem key={alert.id} alert={alert} index={i}/>
              ))}

            </div>

          </div>


          {/* AI Insights */}

          <div className="bg-card border border-border rounded-md p-5">

            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              AI Recommendations
            </h3>

            <div className="space-y-3">

              {topInsights.map((insight)=>(
                <div
                  key={insight.id}
                  className="border border-border bg-background/50 rounded-md p-4"
                >

                  <p className="text-sm">
                    {insight.title}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {insight.impact}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Confidence: {insight.confidence}%
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>


      </div>

    </DashboardLayout>

  );
}