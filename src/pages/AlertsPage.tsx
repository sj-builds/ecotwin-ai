import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AlertItem } from '@/components/AlertItem';
import { alerts } from '@/data/mockData';

type Filter = 'all' | 'high' | 'medium' | 'low';

export default function AlertsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [showResolved, setShowResolved] = useState(false);

  const filtered = alerts.filter(a => {
    if (!showResolved && a.resolved) return false;
    if (filter !== 'all' && a.severity !== filter) return false;
    return true;
  });

  const counts = {
    high: alerts.filter(a => a.severity === 'high' && !a.resolved).length,
    medium: alerts.filter(a => a.severity === 'medium' && !a.resolved).length,
    low: alerts.filter(a => a.severity === 'low' && !a.resolved).length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-light tracking-display text-foreground">ALERTS & MONITORING</h1>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
            {alerts.filter(a => !a.resolved).length} active alerts across campus
          </p>
        </motion.div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {([['high', 'text-destructive', 'bg-destructive/10'], ['medium', 'text-warning', 'bg-warning/10'], ['low', 'text-primary', 'bg-primary/10']] as const).map(([sev, color, bg]) => (
            <motion.div key={sev} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className={`${bg} border border-border rounded-md p-4 text-center cursor-pointer transition-colors ${filter === sev ? 'ring-1 ring-current' : ''}`}
              onClick={() => setFilter(f => f === sev ? 'all' : sev)}>
              <span className={`text-2xl font-light tracking-display tabular-nums ${color}`}>{counts[sev]}</span>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{sev} severity</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowResolved(v => !v)}
            className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-md border border-border transition-colors ${
              showResolved ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {showResolved ? 'Hide' : 'Show'} Resolved
          </button>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {filtered.map((alert, i) => (
            <AlertItem key={alert.id} alert={alert} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground font-mono text-xs uppercase tracking-widest">
              No alerts match current filters
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
