import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import html2pdf from "html2pdf.js";

import { AppSidebar } from "@/components/AppSidebar";
import { monthlyReport, campusMetrics } from "@/data/mockData";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ReportsPage() {

  const handleExport = () => {

    const element = document.getElementById("report-content");

    if (!element) return;

    const opt = {
      margin: 10,
      filename: "EcoTwin_Sustainability_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#06110c] via-[#0a1f17] to-[#03130e] text-gray-200">

      <AppSidebar />

      <main className="flex-1 p-8 space-y-8">


        {/* Header */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-end justify-between"
        >

          <div>

            <h1 className="text-3xl font-light text-white">
              Sustainability Reports
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Monthly performance analytics — March 2026
            </p>

          </div>

          <button
            onClick={handleExport}
            className="
              flex items-center gap-2
              px-4 py-2
              bg-emerald-500
              text-black
              rounded-lg
              text-xs
              font-medium
              hover:brightness-110
              transition
            "
          >

            <Download size={14} />
            Export PDF

          </button>

        </motion.div>



        {/* REPORT CONTENT (THIS WILL EXPORT) */}

        <div id="report-content" className="space-y-8">


          {/* Summary Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {[
              {
                label: "Total Energy",
                value: `${campusMetrics.totalEnergy.toLocaleString()} kWh`,
                trend: campusMetrics.energyTrend
              },
              {
                label: "Carbon Footprint",
                value: `${campusMetrics.carbonFootprint} tons`,
                trend: campusMetrics.carbonTrend
              },
              {
                label: "Sustainability Score",
                value: `${campusMetrics.sustainabilityScore} / 100`,
                trend: campusMetrics.scoreTrend
              },
              {
                label: "Water Consumption",
                value: `${campusMetrics.totalWater.toLocaleString()} m³`,
                trend: campusMetrics.waterTrend
              }
            ].map((card, i) => (

              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  rounded-xl
                  p-6
                "
              >

                <p className="text-xs uppercase text-gray-400 tracking-widest">
                  {card.label}
                </p>

                <p className="text-2xl font-light text-white mt-2">
                  {card.value}
                </p>

                <span
                  className={`text-xs mt-2 block ${
                    card.trend > 0 && card.label !== "Sustainability Score"
                      ? "text-red-400"
                      : "text-emerald-400"
                  }`}
                >
                  {card.trend > 0 ? "↑" : "↓"} {Math.abs(card.trend)}%
                  vs last month
                </span>

              </motion.div>

            ))}

          </div>



          {/* Carbon Chart */}

          <div className="
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            rounded-xl
            p-6
          ">

            <h3 className="text-sm text-white mb-6">
              Carbon Footprint Trend (tons CO₂)
            </h3>

            <ResponsiveContainer width="100%" height={260}>

              <BarChart data={monthlyReport.carbonTrend}>

                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} />

                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid #1f2937",
                    borderRadius: 8
                  }}
                />

                <Bar
                  dataKey="tons"
                  fill="#34d399"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>



          {/* Energy Breakdown Table */}

          <div className="
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            rounded-xl
            overflow-hidden
          ">

            <div className="p-6 border-b border-white/10 flex items-center gap-2">

              <FileText size={16} className="text-emerald-400" />

              <h3 className="text-sm text-white">
                Energy Breakdown by Building
              </h3>

            </div>

            <table className="w-full text-xs">

              <thead>

                <tr className="text-gray-400 border-b border-white/10">

                  <th className="text-left p-4">#</th>
                  <th className="text-left p-4">Building</th>
                  <th className="text-right p-4">kWh</th>
                  <th className="text-right p-4">Share</th>
                  <th className="p-4">Distribution</th>

                </tr>

              </thead>

              <tbody>

                {monthlyReport.energyBreakdown.map((row, i) => (

                  <tr
                    key={row.building}
                    className="border-b border-white/10"
                  >

                    <td className="p-4 text-gray-400">{i + 1}</td>

                    <td className="p-4 text-white">{row.building}</td>

                    <td className="p-4 text-right">
                      {row.kwh.toLocaleString()}
                    </td>

                    <td className="p-4 text-right">
                      {row.pct}%
                    </td>

                    <td className="p-4">

                      <div className="w-full bg-black/40 rounded h-2">

                        <div
                          className="bg-emerald-400 h-2 rounded"
                          style={{ width: `${row.pct * 3}%` }}
                        />

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>

  );

}