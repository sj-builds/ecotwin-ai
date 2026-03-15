import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  trend: number;
  icon: LucideIcon;
  delay?: number;
}

export const MetricCard = ({ label, value, unit, trend, icon: Icon, delay = 0 }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className="bg-card border border-border p-5 rounded-md"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <span className={`text-xs font-mono ${trend > 0 ? 'text-destructive' : 'text-primary'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-light tracking-display text-foreground tabular-nums">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      <span className="text-sm font-mono text-muted-foreground uppercase">{unit}</span>
    </div>
  </motion.div>
);
