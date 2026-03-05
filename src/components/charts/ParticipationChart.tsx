"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { year: number; athletes: number }[];
}

export default function ParticipationChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="athleteGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
          itemStyle={{ color: "var(--color-primary)" }}
          formatter={(value) => [`${value ?? 0} คน`, "นักกีฬา"]}
        />
        <Area
          type="monotone"
          dataKey="athletes"
          stroke="var(--color-primary)"
          strokeWidth={2}
          fill="url(#athleteGrad)"
          dot={{ fill: "var(--color-primary)", r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "var(--color-primary)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
