"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ImageIcon } from "lucide-react";
import { WORKOUTS, type WorkoutDivision } from "@/lib/data/workouts";
import { useRankingsData } from "@/hooks/useRankingsData";
import { cn } from "@/lib/utils";

const DIVISION_COLORS: Record<WorkoutDivision["name"], { bg: string; text: string; border: string }> = {
  Rx:          { bg: "#9BEC00", text: "#111", border: "#9BEC00" },
  Scaled:      { bg: "#111",    text: "#9BEC00", border: "#333" },
  Foundations: { bg: "#3b82f6", text: "#fff", border: "#3b82f6" },
};

type GenderFilter = "all" | "men" | "women";

const GENDER_FILTERS: { key: GenderFilter; label: string; color: string; text: string }[] = [
  { key: "all",   label: "ทั้งหมด", color: "#9BEC00", text: "#111" },
  { key: "men",   label: "ชาย ♂",  color: "#3b82f6", text: "#fff" },
  { key: "women", label: "หญิง ♀", color: "#f472b6", text: "#fff" },
];

function buildBins(reps: number[]): { label: string; count: number }[] {
  if (!reps.length) return [];
  const min = Math.min(...reps);
  const max = Math.max(...reps);
  const range = max - min;
  const binSize = Math.ceil(range / 8) || 10;
  const bins: { label: string; count: number }[] = [];
  for (let start = Math.floor(min / binSize) * binSize; start <= max; start += binSize) {
    const end = start + binSize - 1;
    bins.push({ label: `${start}–${end}`, count: reps.filter(r => r >= start && r <= end).length });
  }
  return bins;
}

function ScoreDistributionBars({
  men, women, gender,
}: {
  men: number[];
  women: number[];
  gender: GenderFilter;
}) {
  const activeMen   = gender !== "women";
  const activeWomen = gender !== "men";

  const menBins   = useMemo(() => buildBins(men),   [men]);
  const womenBins = useMemo(() => buildBins(women), [women]);

  const allBins = useMemo(() => {
    const labels = new Set([...menBins.map(b => b.label), ...womenBins.map(b => b.label)]);
    return Array.from(labels).sort((a, b) => parseInt(a) - parseInt(b)).map(label => ({
      label,
      men:   menBins.find(b => b.label === label)?.count   ?? 0,
      women: womenBins.find(b => b.label === label)?.count ?? 0,
    }));
  }, [menBins, womenBins]);

  const maxCount = Math.max(1, ...allBins.map(b =>
    Math.max(activeMen ? b.men : 0, activeWomen ? b.women : 0)
  ));

  if (!allBins.length) return (
    <div className="flex items-center justify-center h-32">
      <p className="text-xs text-muted-foreground">ยังไม่มีข้อมูล</p>
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1 h-28">
        {allBins.map((bin, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-0.5 justify-end h-full">
            <div className="w-full flex gap-px items-end h-full">
              {activeMen && (
                <div
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${Math.round((bin.men / maxCount) * 100)}%`,
                    backgroundColor: "#3b82f6",
                    minHeight: bin.men > 0 ? "3px" : "0",
                    opacity: 0.85,
                  }}
                />
              )}
              {activeWomen && (
                <div
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${Math.round((bin.women / maxCount) * 100)}%`,
                    backgroundColor: "#f472b6",
                    minHeight: bin.women > 0 ? "3px" : "0",
                    opacity: 0.85,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* X axis labels */}
      <div className="flex gap-1">
        {allBins.map((bin, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[9px] text-muted-foreground leading-none">{bin.label.split("–")[0]}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground text-center">จำนวน reps</p>
    </div>
  );
}

function RxStatsBar({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border/50 p-4 space-y-1">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black" style={{ color }}>{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function WorkoutStats({ workout }: { workout: typeof WORKOUTS[0] }) {
  const [gender, setGender] = useState<GenderFilter>("all");
  const { data: raw, loading } = useRankingsData();

  const { men, women, menReps, womenReps } = useMemo(() => {
    const isValid = (reps: string, div: string) =>
      reps && reps !== "0" && reps !== "Null" && div && div !== "-";

    const menReps = raw
      .filter(r => isValid(r["Reps Men"], r["Division Men"]) && r["Division Men"] === "RX")
      .map(r => Number(r["Reps Men"]));

    const womenReps = raw
      .filter(r => isValid(r["Reps Women"], r["Division Women"]) && r["Division Women"] === "RX")
      .map(r => Number(r["Reps Women"]));

    const avg = (arr: number[]) =>
      arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : 0;

    return {
      men:   { count: menReps.length,   avg: avg(menReps),   top: Math.max(0, ...menReps)   },
      women: { count: womenReps.length, avg: avg(womenReps), top: Math.max(0, ...womenReps) },
      menReps,
      womenReps,
    };
  }, [raw]);

  if (!workout.id.startsWith("26")) return null;

  const showMen   = gender !== "women";
  const showWomen = gender !== "men";

  return (
    <div className="space-y-5">
      {/* Section header + filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-black text-foreground/50 uppercase tracking-widest">
            สถิติ RX · Thailand {workout.name}
          </p>
          {!loading && (
            <p className="text-[10px] text-muted-foreground mt-0.5">
              ชาย {men.count} คน · หญิง {women.count} คน
            </p>
          )}
        </div>
        <div className="flex gap-1.5">
          {GENDER_FILTERS.map(f => (
            <button key={f.key} onClick={() => setGender(f.key)}
              className="px-3 py-1 rounded text-xs font-bold transition-all"
              style={{
                backgroundColor: gender === f.key ? f.color : "transparent",
                color: gender === f.key ? f.text : "#888",
                border: `1.5px solid ${gender === f.key ? f.color : "#ccc"}`,
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-8 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">กำลังโหลดข้อมูล...</p>
        </div>
      ) : (
        <>
          {/* Stat cards: avg + top per gender */}
          <div className={cn("grid gap-3", showMen && showWomen ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2")}>
            {showMen && <>
              <RxStatsBar label="ค่าเฉลี่ย ชาย" value={`${men.avg}`} color="#3b82f6" sub="reps" />
              <RxStatsBar label="สูงสุด ชาย" value={`${men.top}`} color="#3b82f6" sub="reps" />
            </>}
            {showWomen && <>
              <RxStatsBar label="ค่าเฉลี่ย หญิง" value={`${women.avg}`} color="#f472b6" sub="reps" />
              <RxStatsBar label="สูงสุด หญิง" value={`${women.top}`} color="#f472b6" sub="reps" />
            </>}
          </div>

          {/* Score distribution bar chart */}
          <div className="rounded-xl border border-border/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">การกระจายคะแนน · Rx</p>
              <div className="flex gap-3">
                {showMen   && <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-blue-500" />ชาย</span>}
                {showWomen && <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-pink-400" />หญิง</span>}
              </div>
            </div>
            <ScoreDistributionBars men={menReps} women={womenReps} gender={gender} />
          </div>
        </>
      )}
    </div>
  );
}

function WorkoutCard({ workout }: { workout: typeof WORKOUTS[0] }) {
  const [activeDivision, setActiveDivision] = useState<WorkoutDivision["name"]>("Rx");
  const div = workout.divisions.find(d => d.name === activeDivision) ?? workout.divisions[0];

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
              {workout.movements.map(m => (
                <Badge key={m} variant="outline" className="text-xs border-border/50 text-muted-foreground">{m}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Row 1: Image + Division description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Image */}
          <div>
            {workout.image ? (
              <div className="w-full h-full min-h-[220px] rounded-xl overflow-hidden border border-border/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={workout.image} alt={`CrossFit Open ${workout.name}`}
                  className="w-full h-full object-cover object-center" style={{ maxHeight: 340 }} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full min-h-[220px] rounded-xl border-2 border-dashed border-border/40 bg-secondary/30">
                <ImageIcon className="w-8 h-8 text-muted-foreground/30 mb-2" />
                <p className="text-xs text-muted-foreground/50">อัปโหลดรูปประกอบ workout</p>
              </div>
            )}
          </div>

          {/* Division tabs + description + equipment */}
          <div className="space-y-3">
            <div className="flex gap-2">
              {workout.divisions.map(d => {
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

        {/* Row 2: Stats + chart (full width) */}
        <WorkoutStats workout={workout} />

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
