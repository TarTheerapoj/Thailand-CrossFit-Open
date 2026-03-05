import Link from "next/link";
import { ArrowRight, Trophy, BarChart3, Dumbbell, MapPin, ChevronRight } from "lucide-react";
import { SUMMARY_STATS } from "@/lib/data/workouts";

const TICKER_ITEMS = [
  "CROSSFIT OPEN 2026 THAILAND",
  "ดูลีดเดอร์บอร์ด",
  "396 นักกีฬา · 22 Affiliates · 18 จังหวัด",
  "CROSSFIT OPEN 25.1 · 25.2 · 25.3",
  "VIEW LEADERBOARD →",
  "CROSSFIT OPEN 2026 THAILAND",
  "ดูลีดเดอร์บอร์ด",
  "396 นักกีฬา · 22 Affiliates · 18 จังหวัด",
  "CROSSFIT OPEN 25.1 · 25.2 · 25.3",
  "VIEW LEADERBOARD →",
];

const NEWS_CARDS = [
  {
    tag: "CROSSFIT OPEN 2026",
    title: "ผลการแข่งขันรวมทุก Division",
    sub: "ดูสถิติและอันดับ →",
    href: "/dashboard",
    accent: true,
  },
  {
    tag: "LEADERBOARD",
    title: "อันดับนักกีฬาและ Affiliates แยกตาม Division",
    sub: "MEN · WOMEN · MASTERS →",
    href: "/leaderboard",
    accent: false,
  },
  {
    tag: "WORKOUTS",
    title: "วิเคราะห์ Open 25.1, 25.2, 25.3 แบบเจาะลึก",
    sub: "Score Distribution · Completion Rate →",
    href: "/workouts",
    accent: false,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#111] text-white overflow-x-hidden">

      {/* ─── DARK HERO ─────────────────────────────────────────── */}
      <section className="relative bg-[#111] pt-16 pb-0 overflow-hidden">

        {/* Faint grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Lime top bar */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#9BEC00" }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-black tracking-[0.25em] uppercase" style={{ color: "#9BEC00" }}>The 2026 CrossFit Open</span>
            <div className="h-px w-12" style={{ backgroundColor: "#9BEC00", opacity: 0.5 }} />
          </div>

          {/* Big headline */}
          <div className="grid lg:grid-cols-2 gap-10 items-end pb-16">
            <div>
              <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.88] tracking-tight text-white">
                ลุย<span style={{ color: "#9BEC00" }}>ดิวะ</span>
              </h1>
              <p className="text-white/50 text-base sm:text-lg font-light mt-8 max-w-md leading-relaxed">
                วิเคราะห์ผลการแข่งขัน CrossFit Open Thailand 2026
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest uppercase transition-all hover:opacity-90"
                  style={{ backgroundColor: "#9BEC00", color: "#111" }}
                >
                  ดูผลการแข่งขัน
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-all"
                >
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </Link>
              </div>
            </div>

            {/* Stats block — right side */}
            <div className="grid grid-cols-2 gap-px bg-white/10 self-end">
              {[
                { v: SUMMARY_STATS.totalAthletes, l: "Athletes" },
                { v: SUMMARY_STATS.totalAffiliates, l: "Affiliates" },
                { v: SUMMARY_STATS.totalProvinces, l: "Provinces" },
                { v: 8, l: "Divisions" },
              ].map(({ v, l }) => (
                <div key={l} className="bg-[#1a1a1a] px-6 py-8">
                  <p className="text-[2.5rem] font-black leading-none tabular-nums" style={{ color: "#9BEC00" }}>{v}</p>
                  <p className="text-white/60 text-xs font-bold tracking-widest uppercase mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER / MARQUEE ───────────────────────────────────── */}
      <div className="overflow-hidden py-3 select-none" style={{ backgroundColor: "#9BEC00" }}>
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="text-[#111] text-xs font-black tracking-[0.2em] uppercase shrink-0">
              {item} <span className="opacity-40 mx-2">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── NEWS-STYLE CARDS ───────────────────────────────────── */}
      <section className="bg-[#f4f4f4] text-[#111]">
        <div className="max-w-7xl mx-auto">
          {NEWS_CARDS.map(({ tag, title, sub, href, accent }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-6 px-6 sm:px-10 py-7 border-b border-[#ddd] hover:bg-white transition-colors"
            >
              {/* Accent image placeholder box */}
              <div className={`hidden sm:flex w-16 h-16 shrink-0 items-center justify-center font-black text-xs ${accent ? "text-[#111]" : "bg-[#e0e0e0] text-[#666]"}`} style={accent ? { backgroundColor: "#9BEC00" } : {}}>
                {accent ? "NEW" : "→"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-1" style={{ color: accent ? "#9BEC00" : "#999" }}>{tag}</p>
                <p className="text-base sm:text-lg font-black leading-tight text-[#111] truncate">{title}</p>
                <p className="text-xs text-[#888] font-bold tracking-widest uppercase mt-1">{sub}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#bbb] group-hover:text-primary transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── LEADERBOARD PREVIEW ───────────────────────────────── */}
      <section className="bg-[#1a1a1a] text-white py-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.25em] text-white/40 uppercase mb-1">The 2026 CrossFit Open</p>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">Leaderboard</h2>
            </div>
            <Link
              href="/leaderboard"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:border-primary hover:text-primary transition-all"
            >
              View Full Leaderboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Division tabs mock */}
          <div className="flex gap-2 mb-6">
            {["Men Rx", "Women Rx", "Masters"].map((d, i) => (
              <span
                key={d}
                className={`px-4 py-1.5 text-xs font-black tracking-wider uppercase cursor-default ${i === 0 ? "bg-white text-[#111]" : "border border-white/20 text-white/50"}`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Header row */}
          <div className="grid grid-cols-[40px_1fr_80px] gap-4 px-4 py-2 border-b border-white/10 text-[10px] font-black tracking-widest text-white/40 uppercase">
            <span>RANK</span>
            <span>Affiliate · จังหวัด</span>
            <span className="text-right">Points</span>
          </div>

          {/* Placeholder rows */}
          {[1,2,3,4,5].map((rank) => (
            <div key={rank} className="grid grid-cols-[40px_1fr_80px] gap-4 items-center px-4 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              <span className="text-lg font-black text-white/20">{rank}</span>
              <div>
                <p className="text-sm font-bold text-white/80">— ดูข้อมูลจริงใน Leaderboard</p>
                <p className="text-xs text-white/30 mt-0.5">Affiliate · Province</p>
              </div>
              <span className="text-right text-xs font-bold text-primary">— pts</span>
            </div>
          ))}

          <div className="mt-6 sm:hidden">
            <Link
              href="/leaderboard"
              className="w-full flex items-center justify-center gap-2 py-3 border border-white/20 text-white text-xs font-black tracking-widest uppercase hover:border-primary hover:text-primary transition-all"
            >
              View Full Leaderboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EXPLORE NAV STRIP ─────────────────────────────────── */}
      <section className="bg-[#f4f4f4] border-t border-[#ddd]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#ddd]">
          {[
            { href: "/dashboard", icon: BarChart3, title: "ภาพรวม", desc: "Overview · Stats · Charts" },
            { href: "/workouts", icon: Dumbbell, title: "เวิร์คเอาท์", desc: "25.1 · 25.2 · 25.3 Analysis" },
            { href: "/provinces", icon: MapPin, title: "จังหวัด", desc: "Provinces · Affiliates" },
          ].map(({ href, icon: Icon, title, desc }) => (
            <Link key={href} href={href} className="group bg-[#f4f4f4] hover:bg-white px-8 py-8 flex items-start gap-4 transition-colors">
              <div className="p-2.5 bg-[#e4e4e4] group-hover:bg-primary group-hover:text-[#111] transition-all">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-black text-[#111] text-base">{title}</p>
                <p className="text-xs text-[#888] font-medium mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-[#111] border-t border-white/10 py-8 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary flex items-center justify-center text-[#111] font-black text-[11px]">LD</div>
            <span className="font-black text-sm text-white tracking-wide">ลุยดิวะ</span>
            <span className="text-white/30 text-xs">· CrossFit Open Thailand 2026</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/30 font-bold tracking-widest uppercase">
            <span>{SUMMARY_STATS.totalAthletes} Athletes</span>
            <span>{SUMMARY_STATS.totalAffiliates} Affiliates</span>
            <span>Season 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
