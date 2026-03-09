"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";

const DATA = [
  { year: "2017", count: 170 },
  { year: "2018", count: 269 },
  { year: "2019", count: 191 },
  { year: "2020", count: 146 },
  { year: "2021", count: 155 },
  { year: "2022", count: 175 },
  { year: "2023", count: 198 },
  { year: "2024", count: 232 },
  { year: "2025", count: 360 },
  { year: "2026", count: 604 },
];

const MILESTONES = [
  { year: "2020", label: "COVID-19", color: "#ef4444" },
  { year: "2023", label: "Physical: 100 S1", color: "#f59e0b" },
  { year: "2024", label: "Physical: 100 S2", color: "#f59e0b" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const milestone = MILESTONES.find((m) => m.year === label);
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
      <p style={{ color: "#fff", fontWeight: 600 }}>{payload[0].value} <span style={{ color: "#aaa" }}>คน</span></p>
      {milestone && <p style={{ color: milestone.color, fontSize: 10, marginTop: 4 }}>{milestone.label}</p>}
    </div>
  );
}

export default function OpenRegistrationChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={DATA} margin={{ top: 20, right: 16, left: -16, bottom: 0 }}>
        <XAxis
          dataKey="year"
          tick={{ fontSize: 10, fill: "#888", fontWeight: 600 }}
          axisLine={{ stroke: "#ccc" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#999" }}
          axisLine={false}
          tickLine={false}
          domain={[100, 650]}
        />
        <Tooltip content={<CustomTooltip />} />
        {MILESTONES.map((m) => (
          <ReferenceLine
            key={m.year}
            x={m.year}
            stroke={m.color}
            strokeDasharray="4 3"
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
        ))}
        <Line
          type="monotone"
          dataKey="count"
          stroke="#9BEC00"
          strokeWidth={2.5}
          dot={({ cx, cy, payload }) => {
            const isHighlight = payload.year === "2026" || payload.year === "2025";
            return (
              <circle
                key={payload.year}
                cx={cx}
                cy={cy}
                r={isHighlight ? 5 : 3.5}
                fill={isHighlight ? "#9BEC00" : "#7acc00"}
                stroke={isHighlight ? "#fff" : "none"}
                strokeWidth={isHighlight ? 1.5 : 0}
              />
            );
          }}
          activeDot={{ r: 6, fill: "#9BEC00", stroke: "#111", strokeWidth: 2 }}
        >
          <LabelList
            dataKey="count"
            position="top"
            style={{ fontSize: 9, fontWeight: 700, fill: "#555" }}
          />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
