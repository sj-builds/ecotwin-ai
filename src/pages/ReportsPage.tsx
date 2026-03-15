import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { monthlyReport, campusMetrics } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReportsPage() {
  const handleExport = () => {
    // In production, this would generate a PDF
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-display text-foreground">SUSTAINABILITY REPORTS</h1>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
              Monthly performance analytics — March 2026
            </p>
          </div>
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs font-mono uppercase tracking-widest hover:brightness-110 transition-all">
            <Download className="h-3.5 w-3.5" />
            Export PDF
          </button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Energy', value: `${campusMetrics.totalEnergy.toLocaleString()} kWh`, trend: campusMetrics.energyTrend },
            { label: 'Carbon Footprint', value: `${campusMetrics.carbonFootprint} tons`, trend: campusMetrics.carbonTrend },
            { label: 'Sustainability Score', value: `${campusMetrics.sustainabilityScore} / 100`, trend: campusMetrics.scoreTrend },
            { label: 'Water Consumption', value: `${campusMetrics.totalWater.toLocaleString()} m³`, trend: campusMetrics.waterTrend },
          ].map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-md p-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{card.label}</span>
              <p className="text-lg font-light tracking-display text-foreground mt-1 tabular-nums">{card.value}</p>
              <span className={`text-xs font-mono ${card.trend > 0 && card.label !== 'Sustainability Score' ? 'text-destructive' : 'text-primary'}`}>
                {card.trend > 0 ? '↑' : '↓'} {Math.abs(card.trend)}% vs prev. month
              </span>
            </motion.div>
          ))}
        </div>

        {/* Carbon Trend */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-md p-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Carbon Footprint Trend (tons CO₂)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyReport.carbonTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 5%, 20%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(160,5%,50%)', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: 'hsl(160,5%,50%)', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip contentStyle={{ background: 'hsl(160,15%,12%)', border: '1px solid hsl(160,5%,20%)', borderRadius: 4, fontFamily: 'monospace', fontSize: 11 }} />
              <Bar dataKey="tons" fill="hsl(145,60%,50%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Energy Breakdown Table */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-md overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Energy Breakdown by Building</h3>
          </div>
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left p-3 uppercase tracking-widest">#</th>
                <th className="text-left p-3 uppercase tracking-widest">Building</th>
                <th className="text-right p-3 uppercase tracking-widest">kWh</th>
                <th className="text-right p-3 uppercase tracking-widest">Share</th>
                <th className="p-3 uppercase tracking-widest">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.energyBreakdown.map((row, i) => (
                <tr key={row.building} className="border-b border-border/50">
                  <td className="p-3 text-muted-foreground">{i + 1}</td>
                  <td className="p-3 text-foreground">{row.building}</td>
                  <td className="p-3 text-right tabular-nums">{row.kwh.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums">{row.pct}%</td>
                  <td className="p-3">
                    <div className="w-full bg-muted rounded-sm h-1.5">
                      <div className="bg-primary rounded-sm h-1.5 transition-all" style={{ width: `${row.pct * 3}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
