import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { Alert } from '@/data/mockData';

const severityConfig = {
  high: { icon: AlertTriangle, colorClass: 'text-destructive', bgClass: 'bg-destructive/10', borderClass: 'border-destructive/30' },
  medium: { icon: AlertCircle, colorClass: 'text-warning', bgClass: 'bg-warning/10', borderClass: 'border-warning/30' },
  low: { icon: Info, colorClass: 'text-primary', bgClass: 'bg-primary/10', borderClass: 'border-primary/30' },
};

export const AlertItem = ({ alert, index = 0 }: { alert: Alert; index?: number }) => {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`border ${config.borderClass} ${config.bgClass} rounded-md p-4 ${alert.resolved ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.colorClass}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{alert.buildingName}</span>
            <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${config.bgClass} ${config.colorClass}`}>
              {alert.severity}
            </span>
            {alert.resolved && (
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary">resolved</span>
            )}
          </div>
          <p className="text-sm text-foreground mb-2">{alert.issue}</p>
          <p className="text-xs text-muted-foreground font-mono">REC: {alert.recommendation}</p>
        </div>
      </div>
    </motion.div>
  );
};
