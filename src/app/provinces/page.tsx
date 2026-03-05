import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building2 } from "lucide-react";
import { PROVINCE_STATS, AFFILIATES } from "@/lib/data/athletes";
import ProvinceChart from "@/components/charts/ProvinceChart";

export default function ProvincesPage() {
  const totalAthletes = PROVINCE_STATS.reduce((s, p) => s + p.athletes, 0);

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
            <span style={{ color: "#9BEC00" }}>Provinces</span> สถิติตามจังหวัด
          </h1>
          <p className="text-white/50 text-sm mt-2">
            การกระจายตัวของนักกีฬาและ Affiliate ทั่วประเทศไทย
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">นักกีฬาแยกตามจังหวัด</CardTitle>
            <p className="text-xs text-muted-foreground">Top 8 จังหวัด</p>
          </CardHeader>
          <CardContent>
            <ProvinceChart data={PROVINCE_STATS} />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">รายจังหวัด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {PROVINCE_STATS.map((province, i) => {
                const pct = Math.round((province.athletes / totalAthletes) * 100);
                return (
                  <div
                    key={province.province}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border/50 hover:border-border transition-colors"
                  >
                    <span className="w-6 text-center text-xs text-muted-foreground font-medium">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold">{province.province}</span>
                        <span className="text-xs text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-xs font-bold">{province.athletes}</p>
                        <p className="text-[10px] text-muted-foreground">คน</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">{province.affiliates}</p>
                        <p className="text-[10px] text-muted-foreground">แห่ง</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Affiliates ทั้งหมด
          </CardTitle>
          <p className="text-xs text-muted-foreground">{AFFILIATES.length} Box ที่ร่วมการแข่งขัน</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AFFILIATES.map((aff) => (
              <div
                key={aff.name}
                className="p-3 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-colors"
              >
                <p className="text-sm font-semibold truncate">{aff.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {aff.province}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    {aff.athletes}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
