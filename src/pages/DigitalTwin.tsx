import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Droplets, Trash2, Brain } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { buildings, aiInsights } from '@/data/mockData';
import type { Building } from '@/data/mockData';

const statusColors = {
  optimal: 'bg-primary',
  warning: 'bg-warning',
  critical: 'bg-destructive',
};

const statusGlow = {
  optimal: 'animate-pulse-glow',
  warning: 'animate-pulse-amber',
  critical: 'animate-pulse-red',
};

export default function DigitalTwin() {
  const [selected, setSelected] = useState<Building | null>(null);

  const buildingInsights = selected
    ? aiInsights.filter(i => i.buildingId === selected.id)
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-light tracking-display text-foreground">DIGITAL TWIN — CAMPUS MAP</h1>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
            Interactive campus visualization — click a node to inspect
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 relative aspect-[16/10] bg-card rounded-md border border-border overflow-hidden cursor-crosshair"
          >
            <div className="absolute inset-0 dot-grid opacity-30" />
            
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              {[20, 40, 60, 80].map(p => (
                <g key={p}>
                  <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="currentColor" strokeDasharray="4 4" />
                  <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="currentColor" strokeDasharray="4 4" />
                </g>
              ))}
            </svg>

            {/* Building nodes */}
            {buildings.map((b) => (
              <motion.button
                key={b.id}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(b)}
                className={`absolute w-4 h-4 rounded-full border-2 border-foreground/50 ${statusColors[b.status]} ${statusGlow[b.status]} z-10`}
                style={{ left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono border border-border pointer-events-none">
                  {b.name}
                </div>
              </motion.button>
            ))}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              {buildings.slice(0, -1).map((b, i) => {
                const next = buildings[i + 1];
                return (
                  <line key={b.id} x1={`${b.x}%`} y1={`${b.y}%`} x2={`${next.x}%`} y2={`${next.y}%`}
                    stroke="hsl(145,60%,50%)" strokeWidth="1" strokeDasharray="6 3" />
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex gap-4 bg-card/80 backdrop-blur-sm rounded px-3 py-2 border border-border">
              {(['optimal', 'warning', 'critical'] as const).map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${statusColors[s]}`} />
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border rounded-md p-5 space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-light tracking-display text-foreground">{selected.name}</h2>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{selected.type}</span>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Score */}
                <div className="text-center py-3">
                  <span className={`text-4xl font-light tracking-display tabular-nums ${
                    selected.score >= 80 ? 'text-primary' : selected.score >= 60 ? 'text-warning' : 'text-destructive'
                  }`}>{selected.score}</span>
                  <span className="text-sm font-mono text-muted-foreground ml-1">/ 100</span>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Sustainability Score</p>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  {[
                    { icon: Zap, label: 'Energy', value: selected.energy, unit: 'kWh' },
                    { icon: Droplets, label: 'Water', value: selected.water, unit: 'm³' },
                    { icon: Trash2, label: 'Waste', value: selected.waste, unit: 'kg' },
                  ].map(m => (
                    <div key={m.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        <m.icon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{m.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm tabular-nums text-foreground">{m.value.toLocaleString()}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{m.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insights for building */}
                {buildingInsights.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                      <Brain className="h-3 w-3" /> AI Insights
                    </h3>
                    {buildingInsights.map(insight => (
                      <div key={insight.id} className="border border-border bg-background/50 rounded-md p-3 mb-2">
                        <p className="text-xs text-foreground">{insight.title}</p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                <button className="w-full py-2 rounded-md bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest hover:brightness-110 transition-all">
                  Deploy Optimization
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-md p-5 flex items-center justify-center"
              >
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center">
                  Select a building node<br />to inspect details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Building Table */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-md overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">All Buildings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 uppercase tracking-widest">Building</th>
                  <th className="text-left p-3 uppercase tracking-widest">Type</th>
                  <th className="text-right p-3 uppercase tracking-widest">Energy</th>
                  <th className="text-right p-3 uppercase tracking-widest">Water</th>
                  <th className="text-right p-3 uppercase tracking-widest">Waste</th>
                  <th className="text-right p-3 uppercase tracking-widest">Score</th>
                  <th className="text-center p-3 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {buildings.map(b => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-accent/30 cursor-pointer transition-colors"
                    onClick={() => setSelected(b)}>
                    <td className="p-3 text-foreground">{b.name}</td>
                    <td className="p-3 text-muted-foreground">{b.type}</td>
                    <td className="p-3 text-right tabular-nums">{b.energy.toLocaleString()} kWh</td>
                    <td className="p-3 text-right tabular-nums">{b.water.toLocaleString()} m³</td>
                    <td className="p-3 text-right tabular-nums">{b.waste} kg</td>
                    <td className={`p-3 text-right tabular-nums ${b.score >= 80 ? 'text-primary' : b.score >= 60 ? 'text-warning' : 'text-destructive'}`}>
                      {b.score}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block h-2 w-2 rounded-full ${statusColors[b.status]}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
