import { MapPin, Users, Building2 } from "lucide-react";
import { PROVINCE_STATS, AFFILIATES } from "@/lib/data/athletes";
import ProvinceChart from "@/components/charts/ProvinceChart";

const ACCENT = "#9BEC00";

const REGION_ORDER = ["ภาคกลาง", "ภาคเหนือ", "ภาคใต้", "ภาคตะวันตก"];

const REGION_COLOR: Record<string, string> = {
  ภาคกลาง:    "#3b82f6",
  ภาคเหนือ:   "#f59e0b",
  ภาคใต้:     "#22c55e",
  ภาคตะวันตก: "#a855f7",
};

export default function ProvincesPage() {
  const totalAthletes = PROVINCE_STATS.reduce((s, p) => s + p.athletes, 0);
  const totalAffiliates = AFFILIATES.length;

  // Group affiliates by region → province
  const byRegion = REGION_ORDER.map(region => {
    const regionAffiliates = AFFILIATES.filter(a => a.region === region);
    const provinces = [...new Set(regionAffiliates.map(a => a.province))];
    return {
      region,
      color: REGION_COLOR[region],
      provinces: provinces.map(province => ({
        province,
        affiliates: regionAffiliates
          .filter(a => a.province === province)
          .sort((a, b) => b.athletes - a.athletes),
      })),
      totalAthletes: regionAffiliates.reduce((s, a) => s + a.athletes, 0),
      totalAffiliates: regionAffiliates.length,
    };
  }).filter(r => r.provinces.length > 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f6f8" }}>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-[#111] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: ACCENT }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: ACCENT }}>
              CrossFit Open 2026 · Thailand
            </span>
            <div className="h-px w-8 opacity-40" style={{ backgroundColor: ACCENT }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            <span style={{ color: ACCENT }}>CrossFit Affiliates</span> ในประเทศไทย
          </h1>
          <p className="text-white/50 text-sm mt-2">
            ค้นหา Box ฝึกซ้อม CrossFit ใกล้คุณ — แยกตามภาคและจังหวัด
          </p>

          {/* Stats strip */}
          <div className="flex gap-6 mt-6">
            <div>
              <p className="text-2xl font-black" style={{ color: ACCENT }}>{totalAffiliates}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-0.5">Affiliates</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-black text-white">{PROVINCE_STATS.length}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-0.5">จังหวัด</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-2xl font-black text-white">{REGION_ORDER.filter(r => byRegion.find(b => b.region === r)).length}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-0.5">ภาค</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* ── Chart + Stats ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">นักกีฬาแยกตามจังหวัด</p>
            <p className="text-xs text-gray-500 mb-4">Open 2026 · รายจังหวัด</p>
            <ProvinceChart data={PROVINCE_STATS} />
          </div>

          {/* Top 5 Gym */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Top Gym</p>
            <p className="text-xs text-gray-500 mb-4">Open 2026 · เรียงตามจำนวนนักกีฬา</p>
            {(() => {
              const top5 = [...AFFILIATES]
                .filter(a => a.athletes > 0)
                .sort((a, b) => b.athletes - a.athletes)
                .slice(0, 5);
              const maxAthletes = top5[0]?.athletes ?? 1;
              return (
                <div className="space-y-3">
                  {top5.map((gym, i) => {
                    const color = REGION_COLOR[gym.region] ?? ACCENT;
                    const pct = Math.round((gym.athletes / maxAthletes) * 100);
                    const medals = ["🥇", "🥈", "🥉", "4", "5"];
                    return (
                      <div key={gym.name} className="flex items-center gap-3">
                        <span className="w-6 text-center text-sm shrink-0 font-black"
                          style={{ color: i < 3 ? undefined : "#9ca3af" }}>
                          {medals[i]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-gray-800 truncate">{gym.name}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 shrink-0" style={{ color }} />
                                <span className="text-[10px] text-gray-400">{gym.province}</span>
                              </div>
                            </div>
                            <span className="text-sm font-black ml-3 shrink-0" style={{ color }}>
                              {gym.athletes}
                              <span className="text-[10px] font-medium text-gray-400 ml-0.5">คน</span>
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>

        {/* ── Affiliate Directory by Region ───────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <h2 className="text-lg font-black text-gray-900">CrossFit Box Directory</h2>
              <p className="text-xs text-gray-500">{totalAffiliates} Box · แยกตามภาคและจังหวัด</p>
            </div>
          </div>

          <div className="space-y-8">
            {byRegion.map(({ region, color, provinces: provList, totalAthletes: rAthletes, totalAffiliates: rBoxes }) => (
              <div key={region}>
                {/* Region header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <h3 className="text-base font-black text-gray-800">{region}</h3>
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">{rBoxes} Box · {rAthletes} นักกีฬา</span>
                </div>

                {/* Provinces in this region */}
                <div className="space-y-4 pl-6">
                  {provList.map(({ province, affiliates }) => (
                    <div key={province}>
                      {/* Province label */}
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3.5 h-3.5" style={{ color }} />
                        <span className="text-sm font-bold text-gray-700">{province}</span>
                        <span className="text-[10px] text-gray-400">{affiliates.length} Box</span>
                      </div>

                      {/* Affiliate cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {affiliates.map(aff => (
                          <div
                            key={aff.name}
                            className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900 leading-tight">{aff.name}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                                  {aff.province}
                                </p>
                              </div>
                              <div
                                className="shrink-0 px-2 py-1 rounded-lg text-[10px] font-black"
                                style={{ backgroundColor: aff.athletes > 0 ? `${color}20` : "#f3f4f6", color: aff.athletes > 0 ? color : "#9ca3af" }}
                              >
                                <Users className="w-2.5 h-2.5 inline mr-0.5" />
                                {aff.athletes > 0 ? `${aff.athletes} คน` : "—"}
                              </div>
                            </div>
                            {aff.athletes > 0 && (
                              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Open 2026</p>
                                <p className="text-xs font-black text-gray-700">{aff.athletes} นักกีฬา</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
