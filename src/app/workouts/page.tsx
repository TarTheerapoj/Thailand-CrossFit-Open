"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, TrendingUp, ImageIcon } from "lucide-react";
import { WORKOUTS, type WorkoutDivision } from "@/lib/data/workouts";
import { useRankingsData } from "@/hooks/useRankingsData";
import { cn } from "@/lib/utils";

const DIVISION_COLORS: Record<WorkoutDivision["name"], { bg: string; text: string; border: string }> = {
  Rx:          { bg: "#9BEC00",   text: "#111",    border: "#9BEC00" },
  Scaled:      { bg: "#111",      text: "#9BEC00",  border: "#333" },
  Foundations: { bg: "#3b82f6",   text: "#fff",     border: "#3b82f6" },
};

type GenderFilter = "all" | "men" | "women";

function RankingsTable({ workout }: { workout: typeof WORKOUTS[0] }) {
  const [gender, setGender] = useState<GenderFilter>("all");
  const { data: raw, loading, error } = useRankingsData();

  const { men, women } = useMemo(() => {
    const isValid = (reps: string, div: string) =>
      reps && reps !== "0" && reps !== "Null" && div && div !== "-";

    const menRows = raw
      .filter((r) => isValid(r["Reps Men"], r["Division Men"]) && r["Division Men"] === "RX")
      .map((r) => ({ rank: r["TH Rank"], reps: Number(r["Reps Men"]), division: r["Division Men"] }));

    const womenRows = raw
      .filter((r) => isValid(r["Reps Women"], r["Division Women"]) && r["Division Women"] === "RX")
      .map((r) => ({ rank: r["TH Rank"], reps: Number(r["Reps Women"]), division: r["Division Women"] }));

    return { men: menRows, women: womenRows };
  }, [raw]);

  const GENDER_FILTERS: { key: GenderFilter; label: string; color: string; text: string }[] = [
    { key: "all",   label: "ทั้งหมด", color: "#9BEC00", text: "#111" },
    { key: "men",   label: "ชาย",     color: "#3b82f6", text: "#fff" },
    { key: "women", label: "หญิง",    color: "#f472b6", text: "#fff" },
  ];

  if (!workout.id.startsWith("26")) return null;

  return (
    <div className="space-y-4">
      {/* Header + filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-black text-foreground/50 uppercase tracking-widest">
            Thailand RX Rankings · {workout.name}
          </p>
          {!loading && !error && (
            <p className="text-[10px] text-muted-foreground mt-0.5">
              ชาย {men.length} คน · หญิง {women.length} คน
            </p>
          )}
        </div>
        <div className="flex gap-1.5">
          {GENDER_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setGender(f.key)}
              className="px-3 py-1 rounded text-xs font-bold transition-all"
              style={{
                backgroundColor: gender === f.key ? f.color : "transparent",
                color: gender === f.key ? f.text : "#888",
                border: `1.5px solid ${gender === f.key ? f.color : "#bbb"}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-10 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">กำลังโหลดข้อมูล...</p>
        </div>
      ) : error ? (
        <div className="py-10 flex items-center justify-center">
          <p className="text-xs text-red-500">โหลดข้อมูลไม่สำเร็จ</p>
        </div>
      ) : (
        <div className={cn(
          "grid gap-4",
          gender === "all" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-lg"
        )}>
          {(gender === "all" || gender === "men") && (
            <RankColumn
              title="Men Rx"
              accent="#3b82f6"
              rows={men}
            />
          )}
          {(gender === "all" || gender === "women") && (
            <RankColumn
              title="Women Rx"
              accent="#f472b6"
              rows={women}
            />
          )}
        </div>
      )}
    </div>
  );
}

function RankColumn({ title, accent, rows }: {
  title: string;
  accent: string;
  rows: { rank: string; reps: number; division: string }[];
}) {
  const top = rows[0]?.reps ?? 0;
  return (
    <div className="rounded-xl border border-border/50 overflow-hidden">
      {/* Column header */}
      <div className="px-4 py-2.5 flex items-center gap-2 border-b border-border/40"
        style={{ backgroundColor: `${accent}15` }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>{title}</p>
        <span className="ml-auto text-[10px] text-muted-foreground">{rows.length} คน</span>
      </div>
      {/* Table header */}
      <div className="grid grid-cols-12 px-4 py-1.5 bg-secondary/30 border-b border-border/30">
        <span className="col-span-2 text-[10px] font-bold text-muted-foreground uppercase">#</span>
        <span className="col-span-6 text-[10px] font-bold text-muted-foreground uppercase">Reps</span>
        <span className="col-span-4 text-[10px] font-bold text-muted-foreground uppercase text-right">% of #1</span>
      </div>
      {/* Rows */}
      <div className="max-h-80 overflow-y-auto divide-y divide-border/20">
        {rows.map((row, i) => {
          const pct = top > 0 ? Math.round((row.reps / top) * 100) : 0;
          const isTop3 = i < 3;
          return (
            <div key={i}
              className="grid grid-cols-12 px-4 py-2.5 items-center hover:bg-secondary/30 transition-colors">
              <span className={cn(
                "col-span-2 text-xs font-black",
                i === 0 ? "text-yellow-500" : i === 1 ? "text-zinc-400" : i === 2 ? "text-amber-600" : "text-muted-foreground"
              )}>
                {isTop3 ? ["🥇","🥈","🥉"][i] : `#${row.rank}`}
              </span>
              <div className="col-span-6 flex items-center gap-2">
                <div className="h-1.5 rounded-full flex-1 max-w-[80px] bg-border/30 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: accent }} />
                </div>
                <span className="text-sm font-bold">{row.reps}</span>
              </div>
              <span className="col-span-4 text-xs text-muted-foreground text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkoutCard({ workout }: { workout: typeof WORKOUTS[0] }) {
  const [activeDivision, setActiveDivision] = useState<WorkoutDivision["name"]>("Rx");
  const div = workout.divisions.find((d) => d.name === activeDivision) ?? workout.divisions[0];

  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      <div className="h-1" style={{ background: "linear-gradient(to right, #9BEC00, #9BEC0060, transparent)" }} />

      <CardHeader className="pb-3">
        <div className="flex items-start gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <CardTitle className="text-2xl font-black tracking-tight">{workout.name}</CardTitle>
              <Badge className="bg-primary/15 text-primary border-primary/20 text-xs" variant="outline">
                {workout.type}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {workout.timeCapMinutes} นาที
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {workout.movements.map((m) => (
                <Badge key={m} variant="outline" className="text-xs border-border/50 text-muted-foreground">
                  {m}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Image + description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            {workout.image ? (
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-border/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={workout.image}
                  alt={`CrossFit Open ${workout.name}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full aspect-[4/3] rounded-xl border-2 border-dashed border-border/40 bg-secondary/30">
                <ImageIcon className="w-8 h-8 text-muted-foreground/30 mb-2" />
                <p className="text-xs text-muted-foreground/50">อัปโหลดรูปประกอบ workout</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              {workout.divisions.map((d) => {
                const c = DIVISION_COLORS[d.name];
                const isActive = activeDivision === d.name;
                return (
                  <button key={d.name} onClick={() => setActiveDivision(d.name)}
                    className="px-3 py-1 rounded-md text-xs font-black tracking-wide transition-all"
                    style={{
                      backgroundColor: isActive ? c.bg : "transparent",
                      color: isActive ? c.text : "#888",
                      border: `1.5px solid ${isActive ? c.border : "#ccc"}`,
                    }}>
                    {d.name}
                  </button>
                );
              })}
            </div>

            <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-secondary/50 rounded-lg p-3 font-sans leading-relaxed border border-border/50">
              {div.description}
            </pre>

            <div className="rounded-lg border border-border/50 overflow-hidden">
              <div className="px-3 py-2 bg-secondary/50 border-b border-border/40">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">อุปกรณ์ · {activeDivision}</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-border/40">
                <div className="px-3 py-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">♀ หญิง</p>
                  <p className="text-xs leading-snug">{div.equipment.women}</p>
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">♂ ชาย</p>
                  <p className="text-xs leading-snug">{div.equipment.men}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rx stats only */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "ค่าเฉลี่ย (Rx)", value: workout.avgScoreRx,  icon: Target,    color: "text-primary" },
            { label: "สูงสุด (Rx)",    value: workout.topScoreRx,   icon: TrendingUp, color: "text-green-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card rounded-xl p-3 border border-border/50">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={cn("w-3.5 h-3.5", color)} />
                <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
              </div>
              <p className="text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Rankings */}
        <RankingsTable workout={workout} />

      </CardContent>
    </Card>
  );
}

export default function WorkoutsPage() {
  return (
    <div className="space-y-8">
      {/* Dark hero header */}
      <section className="bg-[#111] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: "#9BEC00" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: "#9BEC00" }}>CrossFit Open 2026 · Thailand</span>
            <div className="h-px w-8" style={{ backgroundColor: "#9BEC00", opacity: 0.4 }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            <span style={{ color: "#9BEC00" }}>Workouts</span> วิเคราะห์เวิร์คเอาท์
          </h1>
          <p className="text-white/50 text-sm mt-2">
            รายละเอียดและสถิติแต่ละ Workout ใน CrossFit Open 2026
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-10">
          {WORKOUTS.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  );
}
