import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

import type { Alert } from "@/data/mockData";

const severityConfig = {

  high: {
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },

  medium: {
    icon: AlertCircle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },

  low: {
    icon: Info,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  }

};

export const AlertItem = ({
  alert,
  index = 0
}: {
  alert: Alert;
  index?: number;
}) => {

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (

    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`
        ${config.bg}
        backdrop-blur-xl
        border ${config.border}
        rounded-xl
        p-5
        transition
        hover:bg-white/10
        ${alert.resolved ? "opacity-50" : ""}
      `}
    >

      <div className="flex items-start gap-4">

        {/* Icon */}

        <div className={`p-2 rounded-lg ${config.bg}`}>
          <Icon size={16} className={config.color}/>
        </div>


        {/* Alert Content */}

        <div className="flex-1 min-w-0">

          {/* Header */}

          <div className="flex items-center gap-2 mb-2">

            <span className="text-xs text-gray-400 uppercase tracking-widest">
              {alert.buildingName}
            </span>

            <span
              className={`text-[10px] uppercase px-2 py-0.5 rounded ${config.bg} ${config.color}`}
            >
              {alert.severity}
            </span>

            {alert.resolved && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                resolved
              </span>
            )}

          </div>


          {/* Issue */}

          <p className="text-sm text-white mb-2">
            {alert.issue}
          </p>


          {/* Recommendation */}

          <p className="text-xs text-gray-400">
            AI Recommendation: {alert.recommendation}
          </p>

        </div>

      </div>

    </motion.div>

  );

};