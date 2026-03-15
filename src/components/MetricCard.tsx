import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  unit: string;
  trend?: number;
  icon: LucideIcon;
}

export default function MetricCard({
  label,
  value,
  unit,
  trend,
  icon: Icon
}: Props) {

  const isPositive = trend !== undefined && trend < 0;

  return (

    <div className="bg-card border border-border rounded-md p-4">

      <div className="flex items-center justify-between">

        <span className="text-xs font-mono text-muted-foreground uppercase">
          {label}
        </span>

        <Icon className="h-4 w-4 text-primary"/>

      </div>

      <p className="text-xl font-light mt-2 tabular-nums">
        {value.toLocaleString()} {unit}
      </p>

      {trend !== undefined && (

        <span
          className={`text-xs font-mono ${
            isPositive ? "text-primary" : "text-destructive"
          }`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </span>

      )}

    </div>

  );

}