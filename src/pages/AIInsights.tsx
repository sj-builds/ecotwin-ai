import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { aiInsights, energyTrendData } from '@/data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const typeConfig = {
  prediction: { icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
  anomaly: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
  recommendation: { icon: Lightbulb, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
};

export default function AIInsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-light tracking-display text-foreground">AI INSIGHTS ENGINE</h1>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
            Machine learning analytics — anomaly detection & predictions
          </p>
        </motion.div>

        {/* Prediction Chart */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-md p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Predicted vs Actual Energy Consumption</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={energyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(160, 5%, 20%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(160,5%,50%)', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: 'hsl(160,5%,50%)', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip contentStyle={{ background: 'hsl(160,15%,12%)', border: '1px solid hsl(160,5%,20%)', borderRadius: 4, fontFamily: 'monospace', fontSize: 11 }} />
              <Area type="monotone" dataKey="predicted" stroke="hsl(200,70%,55%)" fill="hsl(200,70%,55%,0.1)" strokeWidth={2} name="ML Predicted" />
              <Area type="monotone" dataKey="actual" stroke="hsl(145,60%,50%)" fill="hsl(145,60%,50%,0.1)" strokeWidth={2} name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
            <span>MODEL: Isolation Forest + ARIMA Hybrid</span>
            <span>ACCURACY: 94.2%</span>
            <span>LAST TRAINED: 2h ago</span>
          </div>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiInsights.map((insight, i) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={`bg-card border ${config.border} rounded-md p-5 hover:bg-accent/30 transition-colors`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded ${config.bg}`}>
                    <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${config.color}`}>{insight.type}</span>
                  <span className="ml-auto text-[10px] font-mono text-muted-foreground tabular-nums">{insight.confidence}%</span>
                </div>
                <h3 className="text-sm text-foreground mb-2">{insight.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{insight.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-[10px] font-mono text-muted-foreground">IMPACT</span>
                  <span className={`text-[10px] font-mono ${config.color}`}>{insight.impact}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Model Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-md p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">AI Module Status</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Models Active', value: '4' },
              { label: 'Predictions/day', value: '1,247' },
              { label: 'Anomalies Caught', value: '23' },
              { label: 'Avg. Response', value: '120ms' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <span className="text-xl font-light tracking-display text-foreground tabular-nums">{stat.value}</span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
