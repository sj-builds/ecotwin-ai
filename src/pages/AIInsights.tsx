import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  BarChart3
} from "lucide-react";

import { DashboardLayout } from "@/components/DashboardLayout";

import { aiInsights, energyTrendData } from "@/data/mockData";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const typeConfig = {
  prediction: {
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  anomaly: {
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
  recommendation: {
    icon: Lightbulb,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  }
};

export default function AIInsightsPage() {

  return (

    <DashboardLayout>

      <div className="space-y-8 w-full">

        {/* Header */}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <h1 className="text-3xl font-light text-white">
            AI Insights Engine
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Machine learning analytics — anomaly detection & predictions
          </p>

        </motion.div>


        {/* Prediction Chart */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
        >

          <div className="flex items-center gap-2 mb-6">

            <BarChart3 className="text-emerald-400" size={18} />

            <h3 className="text-sm text-white">
              Predicted vs Actual Energy Consumption
            </h3>

          </div>

          <ResponsiveContainer width="100%" height={280}>

            <AreaChart data={energyTrendData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} />

              <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />

              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #1f2937",
                  borderRadius: 8,
                  fontSize: 12
                }}
              />

              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#38bdf8"
                fill="rgba(56,189,248,0.15)"
                strokeWidth={2}
                name="ML Prediction"
              />

              <Area
                type="monotone"
                dataKey="actual"
                stroke="#34d399"
                fill="rgba(52,211,153,0.15)"
                strokeWidth={2}
                name="Actual"
              />

            </AreaChart>

          </ResponsiveContainer>

          <div className="mt-4 flex gap-6 text-xs text-gray-400">

            <span>MODEL: Isolation Forest + ARIMA</span>
            <span>ACCURACY: 94.2%</span>
            <span>UPDATED: 2h ago</span>

          </div>

        </motion.div>


        {/* AI Insight Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {aiInsights.map((insight, i) => {

            const config = typeConfig[insight.type];
            const Icon = config.icon;

            return (

              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={`bg-white/5 backdrop-blur-xl border ${config.border} rounded-xl p-5 hover:bg-white/10 transition`}
              >

                <div className="flex items-center gap-2 mb-3">

                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    <Icon size={16} className={config.color}/>
                  </div>

                  <span className={`text-xs uppercase ${config.color}`}>
                    {insight.type}
                  </span>

                  <span className="ml-auto text-xs text-gray-400">
                    {insight.confidence}%
                  </span>

                </div>

                <h3 className="text-sm text-white mb-2">
                  {insight.title}
                </h3>

                <p className="text-xs text-gray-400 mb-4">
                  {insight.description}
                </p>

                <div className="flex justify-between text-xs border-t border-white/10 pt-3">

                  <span className="text-gray-400">Impact</span>

                  <span className={config.color}>
                    {insight.impact}
                  </span>

                </div>

              </motion.div>

            );

          })}

        </div>


        {/* AI System Status */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
        >

          <div className="flex items-center gap-2 mb-6">

            <Brain className="text-emerald-400" size={18} />

            <h3 className="text-sm text-white">
              AI System Status
            </h3>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {[
              { label: "Models Active", value: "4" },
              { label: "Predictions / day", value: "1,247" },
              { label: "Anomalies Detected", value: "23" },
              { label: "Avg Response", value: "120ms" }
            ].map(stat => (

              <div key={stat.label} className="text-center">

                <p className="text-2xl text-white font-light">
                  {stat.value}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </DashboardLayout>

  );

}