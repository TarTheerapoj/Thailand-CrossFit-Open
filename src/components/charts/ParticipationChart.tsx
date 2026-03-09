"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface ParticipationEntry {
  year: number;
  men: number;
  women: number;
  total: number;
}

interface Props {
  data: ParticipationEntry[];
}

type Filter = "total" | "men" | "women";

const FILTERS: { key: Filter; label: string; color: string; activeText: string }[] = [
  { key: "total", label: "รวม",  color: "#9BEC00", activeText: "#111" },
  { key: "men",   label: "ชาย",  color: "#3b82f6", activeText: "#fff" },
  { key: "women", label: "หญิง", color: "#f472b6", activeText: "#fff" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      backgroundColor: "#111",
      border: "1px solid #9BEC00",
      borderRadius: 6,
      padding: "8px 14px",
      fontSize: 12,
      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    }}>
      <p style={{ color: "#9BEC00", fontWeight: 800, marginBottom: 4 }}>ปี {label}</p>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value} คน
        </p>
      ))}
    </div>
  );
}

export default function ParticipationChart({ data }: Props) {
  const [filter, setFilter] = useState<Filter>("total");
  const active = FILTERS.find((f) => f.key === filter)!;

  return (
    <div className="space-y-3">
      {/* Filter toggle */}
      <div className="flex gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold tracking-wide transition-all"
            style={{
              backgroundColor: filter === f.key ? f.color : "transparent",
              color: filter === f.key ? f.activeText : "#555",
              border: `1.5px solid ${filter === f.key ? f.color : "#bbb"}`,
            }}
          >
            {filter !== f.key && (
              <span className="w-2 h-2 rounded-full shrink-0 inline-block" style={{ backgroundColor: f.color }} />
            )}
            {f.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={active.color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={active.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#999" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            key={filter}
            type="monotone"
            dataKey={filter}
            name={active.label}
            stroke={active.color}
            strokeWidth={2.5}
            fill="url(#areaGrad)"
            dot={{ fill: active.color, r: 3.5, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: active.color, stroke: "#fff", strokeWidth: 1.5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
