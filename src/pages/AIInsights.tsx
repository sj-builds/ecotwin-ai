import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import { DashboardLayout } from "@/components/DashboardLayout";
import CampusMap from "@/components/CampusMap";

import { campusData } from "@/data/campusData";
import {
  detectCampusAnomalies,
  generateCampusPredictions,
  generateCampusAlerts,
} from "@/lib/campusAnalytics";

import { askAI } from "@/lib/aiClient";

// ---------------- CONFIG ----------------

const typeConfig: any = {
  prediction: {
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  anomaly: {
    icon: AlertTriangle,
    color: "text-red-400",
  },
  recommendation: {
    icon: Lightbulb,
    color: "text-amber-400",
  },
};

// ---------------- COMPONENT ----------------

export default function AIInsightsPage() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [explanation, setExplanation] = useState("");

  const [selectedBlock, setSelectedBlock] = useState<any>(null);
  const [blockInsight, setBlockInsight] = useState("");

  // ---------------- ANALYTICS ----------------

  const anomalies = detectCampusAnomalies(campusData);
  const predictions = generateCampusPredictions(campusData);
  const alerts = generateCampusAlerts(campusData);

  // ---------------- AI MAIN ----------------

  const runAI = async () => {
    try {
      setLoading(true);

      const context = {
        campus: campusData,
        anomalies,
        predictions,
        alerts,
      };

      const res = await askAI({
        input: `
Analyze campus system.
Detect inefficiencies, predict load, and recommend optimizations.
`,
        context,
        type: "analysis",
      });

      let parsed: any[] = [];

      try {
        const cleaned = res.reply.match(/\[.*\]/s)?.[0];
        parsed = JSON.parse(cleaned || "[]");
      } catch {
        parsed = [];
      }

      parsed.sort((a, b) => b.confidence - a.confidence);

      setInsights(parsed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAI();
    const interval = setInterval(runAI, 15000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- DRILL DOWN ----------------

  const explainInsight = async (insight: any) => {
    setSelectedInsight(insight);

    const res = await askAI({
      input: `Explain this insight deeply: ${insight.title}`,
      context: { insight },
    });

    setExplanation(res.reply);
  };

  const analyzeBlock = async (block: any) => {
    setSelectedBlock(block);

    const res = await askAI({
      input: `Analyze this campus block and identify inefficiencies`,
      context: { block },
    });

    setBlockInsight(res.reply);
  };

  // ---------------- UI ----------------

  return (
    <DashboardLayout>
      <div className="space-y-8 w-full">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl text-white">
            Campus Digital Twin AI
          </h1>
          <p className="text-sm text-gray-400">
            Real-time campus intelligence & optimization
          </p>
        </motion.div>

        {/* DIGITAL TWIN MAP */}
        <CampusMap data={campusData} onSelect={analyzeBlock} />

        {/* BLOCK ANALYSIS */}
        {selectedBlock && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-white text-sm mb-2">
              {selectedBlock.block} Analysis
            </h3>
            <p className="text-xs text-gray-400">
              {blockInsight || "Analyzing..."}
            </p>
          </div>
        )}

        {/* ALERTS */}
        <div className="space-y-3">
          <h3 className="text-sm text-white">Campus Alerts</h3>

          {alerts.map((a, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg text-xs border ${
                a.severity === "high"
                  ? "border-red-500 text-red-400"
                  : "border-yellow-500 text-yellow-400"
              }`}
            >
              {a.block}: {a.message}
            </div>
          ))}
        </div>

        {/* AI INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-400 text-sm">
              Analyzing campus...
            </p>
          ) : (
            insights.map((insight, i) => {
              const config =
                typeConfig[insight.type] || typeConfig.recommendation;
              const Icon = config.icon;

              return (
                <motion.div
                  key={i}
                  onClick={() => explainInsight(insight)}
                  className="cursor-pointer bg-white/5 border rounded-xl p-5 hover:bg-white/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} className={config.color} />
                    <span className="text-xs text-white">
                      {insight.type}
                    </span>
                  </div>

                  <h3 className="text-sm text-white">
                    {insight.title}
                  </h3>

                  <p className="text-xs text-gray-400">
                    {insight.description}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>

        {/* INSIGHT DRILL-DOWN */}
        {selectedInsight && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h3 className="text-white text-sm mb-2">
              Deep Insight Analysis
            </h3>

            <p className="text-xs text-gray-400">
              {explanation || "Loading..."}
            </p>
          </div>
        )}

        {/* SYSTEM STATUS */}
        <motion.div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="text-emerald-400" size={18} />
            <h3 className="text-sm text-white">System Status</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl text-white">{insights.length}</p>
              <p className="text-xs text-gray-400">Insights</p>
            </div>

            <div className="text-center">
              <p className="text-2xl text-white">{anomalies.length}</p>
              <p className="text-xs text-gray-400">Anomalies</p>
            </div>

            <div className="text-center">
              <p className="text-2xl text-white">{alerts.length}</p>
              <p className="text-xs text-gray-400">Alerts</p>
            </div>

            <div className="text-center">
              <p className="text-2xl text-white">Live</p>
              <p className="text-xs text-gray-400">Status</p>
            </div>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}