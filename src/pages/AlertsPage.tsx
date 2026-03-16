import { useState } from "react";
import { motion } from "framer-motion";

import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertItem } from "@/components/AlertItem";
import { alerts } from "@/data/mockData";

type Filter = "all" | "high" | "medium" | "low";

export default function AlertsPage() {

  const [filter, setFilter] = useState<Filter>("all");
  const [showResolved, setShowResolved] = useState(false);

  const filtered = alerts.filter(a => {
    if (!showResolved && a.resolved) return false;
    if (filter !== "all" && a.severity !== filter) return false;
    return true;
  });

  const counts = {
    high: alerts.filter(a => a.severity === "high" && !a.resolved).length,
    medium: alerts.filter(a => a.severity === "medium" && !a.resolved).length,
    low: alerts.filter(a => a.severity === "low" && !a.resolved).length,
  };

  return (

    <DashboardLayout>

      <div className="w-full space-y-8">

        {/* Header */}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <h1 className="text-3xl font-light text-white">
            Alerts & Monitoring
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            {alerts.filter(a => !a.resolved).length} active alerts across campus
          </p>

        </motion.div>



        {/* Alert Summary */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {([
            ["high", "text-red-400", "bg-red-500/10"],
            ["medium", "text-amber-400", "bg-amber-500/10"],
            ["low", "text-emerald-400", "bg-emerald-500/10"]
          ] as const).map(([sev, color, bg]) => (

            <motion.div
              key={sev}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                ${bg}
                backdrop-blur-xl
                border border-white/10
                rounded-xl
                p-6
                text-center
                cursor-pointer
                transition
                hover:bg-white/10
                ${filter === sev ? "ring-2 ring-white/30" : ""}
              `}
              onClick={() => setFilter(f => f === sev ? "all" : sev)}
            >

              <p className={`text-4xl font-light ${color}`}>
                {counts[sev]}
              </p>

              <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">
                {sev} severity
              </p>

            </motion.div>

          ))}

        </div>



        {/* Filters */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => setShowResolved(v => !v)}
            className="
              bg-white/5
              backdrop-blur-xl
              border border-white/10
              px-4 py-2
              rounded-lg
              text-xs
              hover:bg-white/10
              transition
            "
          >
            {showResolved ? "Hide" : "Show"} Resolved Alerts
          </button>

        </div>



        {/* Alert List */}

        <div className="space-y-4">

          {filtered.map((alert, i) => (
            <AlertItem key={alert.id} alert={alert} index={i} />
          ))}

          {filtered.length === 0 && (

            <div className="text-center py-16 text-gray-400 text-xs uppercase tracking-widest">
              No alerts match current filters
            </div>

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}