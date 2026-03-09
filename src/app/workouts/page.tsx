"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, TrendingUp, ImageIcon } from "lucide-react";
import { WORKOUTS, type WorkoutDivision } from "@/lib/data/workouts";
import ScoreDistributionChart from "@/components/charts/ScoreDistributionChart";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DIVISION_COLORS: Record<WorkoutDivision["name"], { bg: string; text: string; border: string }> = {
  Rx:          { bg: "#9BEC00",   text: "#111",    border: "#9BEC00" },
  Scaled:      { bg: "#111",      text: "#9BEC00",  border: "#333" },
  Foundations: { bg: "#3b82f6",   text: "#fff",     border: "#3b82f6" },
};

function WorkoutCard({ workout }: { workout: typeof WORKOUTS[0] }) {
  const [activeDivision, setActiveDivision] = useState<WorkoutDivision["name"]>("Rx");
  const div = workout.divisions.find((d) => d.name === activeDivision) ?? workout.divisions[0];

  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      <div className="h-1" style={{ background: "linear-gradient(to right, #9BEC00, #9BEC0060, transparent)" }} />

      {/* Header row */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
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

        {/* Main content: image + description side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Left: Image slot */}
          <div className="order-1">
            {workout.image ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50">
                <Image
                  src={workout.image}
                  alt={`CrossFit Open ${workout.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-border/40 bg-secondary/30">
                <ImageIcon className="w-8 h-8 text-muted-foreground/30 mb-2" />
                <p className="text-xs text-muted-foreground/50 font-medium">Workout image</p>
                <p className="text-[10px] text-muted-foreground/30 mt-0.5">อัปโหลดรูปประกอบ workout</p>
              </div>
            )}
          </div>

          {/* Right: Division tabs + description */}
          <div className="order-2 space-y-3">
            {/* Division tabs */}
            <div className="flex gap-2">
              {workout.divisions.map((d) => {
                const c = DIVISION_COLORS[d.name];
                const isActive = activeDivision === d.name;
                return (
                  <button
                    key={d.name}
                    onClick={() => setActiveDivision(d.name)}
                    className="px-3 py-1 rounded-md text-xs font-black tracking-wide transition-all"
                    style={{
                      backgroundColor: isActive ? c.bg : "transparent",
                      color: isActive ? c.text : "#888",
                      border: `1.5px solid ${isActive ? c.border : "#ccc"}`,
                    }}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>

            {/* Movement description */}
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-secondary/50 rounded-lg p-3 font-sans leading-relaxed border border-border/50 min-h-[140px]">
              {div.description}
            </pre>

            {/* Equipment */}
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

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "ค่าเฉลี่ย (Rx)",    value: workout.avgScoreRx,    icon: Target,    color: "text-primary" },
            { label: "สูงสุด (Rx)",       value: workout.topScoreRx,    icon: TrendingUp, color: "text-green-600" },
            { label: "ค่าเฉลี่ย (Scaled)", value: workout.avgScoreScaled, icon: Target,    color: "text-blue-600" },
            { label: "สูงสุด (Scaled)",    value: workout.topScoreScaled, icon: TrendingUp, color: "text-yellow-600" },
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

        {/* Rx vs Scaled + Score distribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div className="space-y-5">
            <p className="text-xs font-black text-foreground/50 uppercase tracking-widest">อัตราการทำ Rx vs Scaled</p>
            <div className="space-y-2">
              <div className="flex w-full h-8 rounded overflow-hidden">
                <div
                  className="flex items-center justify-center text-xs font-black text-[#111] tracking-wide"
                  style={{ width: `${workout.completionRateRx}%`, backgroundColor: "#9BEC00" }}
                >
                  {workout.completionRateRx}%
                </div>
                <div
                  className="flex items-center justify-center text-xs font-black text-white tracking-wide"
                  style={{ width: `${workout.completionRateScaled}%`, backgroundColor: "#1a1a1a" }}
                >
                  {workout.completionRateScaled}%
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: "#9BEC00" }} />
                  <span className="text-foreground/70">Rx</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-foreground/70">Scaled</span>
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: "#1a1a1a" }} />
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">การกระจายคะแนน</p>
            <ScoreDistributionChart data={workout.scoreDistribution} />
          </div>
        </div>

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
