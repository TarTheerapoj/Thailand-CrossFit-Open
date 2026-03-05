import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, MapPin, TrendingUp, Trophy, Dumbbell, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SUMMARY_STATS } from "@/lib/data/workouts";
import { ATHLETES } from "@/lib/data/athletes";
import ParticipationChart from "@/components/charts/ParticipationChart";
import DivisionChart from "@/components/charts/DivisionChart";

const statCards = [
  {
    title: "นักกีฬาทั้งหมด",
    value: SUMMARY_STATS.totalAthletes,
    suffix: "คน",
    icon: Users,
    trend: "+3.7% จากปี 2026",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Affiliate ทั้งหมด",
    value: SUMMARY_STATS.totalAffiliates,
    suffix: "แห่ง",
    icon: Building2,
    trend: "+2 แห่งจากปีก่อน",
    color: "text-blue-600",
    bg: "bg-blue-600/10",
  },
  {
    title: "จังหวัดที่ร่วมแข่ง",
    value: SUMMARY_STATS.totalProvinces,
    suffix: "จังหวัด",
    icon: MapPin,
    trend: "ครอบคลุมทั่วประเทศ",
    color: "text-green-600",
    bg: "bg-green-600/10",
  },
  {
    title: "จำนวนเวิร์คเอาท์",
    value: 3,
    suffix: "ท่า",
    icon: Dumbbell,
    trend: "Open 25.1 – 25.3",
    color: "text-yellow-600",
    bg: "bg-yellow-600/10",
  },
];

export default function DashboardPage() {
  const topMen = ATHLETES.filter((a) => a.division === "Men Rx").slice(0, 3);
  const topWomen = ATHLETES.filter((a) => a.division === "Women Rx").slice(0, 3);

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
            ภาพรวมการแข่งขัน <span style={{ color: "#9BEC00" }}>CrossFit Open Thailand</span>
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-2xl">
            วิเคราะห์ผลการแข่งขัน CrossFit Open 2026 ของนักกีฬาไทย แยกตาม Division อย่างครอบคลุม
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border/50 bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold">
                      {stat.value.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-1">{stat.suffix}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      {stat.trend}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">การเติบโตของผู้เข้าร่วม</CardTitle>
            <p className="text-xs text-muted-foreground">จำนวนนักกีฬาในแต่ละปี (2020–2026)</p>
          </CardHeader>
          <CardContent>
            <ParticipationChart data={SUMMARY_STATS.participationByYear} />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">สัดส่วนตาม Division</CardTitle>
            <p className="text-xs text-muted-foreground">จำนวนนักกีฬาแต่ละ Division ปี 2026</p>
          </CardHeader>
          <CardContent>
            <DivisionChart data={SUMMARY_STATS.divisions} />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Men Rx – Top 3", athletes: topMen, linkHref: "/leaderboard?division=Men+Rx" },
          { title: "Women Rx – Top 3", athletes: topWomen, linkHref: "/leaderboard?division=Women+Rx" },
        ].map(({ title, athletes, linkHref }) => (
          <Card key={title} className="border-border/50 bg-card">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
              </div>
              <Link
                href={linkHref}
                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
              >
                ดูทั้งหมด <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {athletes.map((athlete, i) => (
                <div
                  key={athlete.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                      i === 0
                        ? "bg-yellow-400/20 text-yellow-600 ring-1 ring-yellow-500/40"
                        : i === 1
                        ? "bg-zinc-400/20 text-zinc-500 ring-1 ring-zinc-400/40"
                        : "bg-amber-600/20 text-amber-700 ring-1 ring-amber-600/40"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{athlete.affiliate}</p>
                    <p className="text-xs text-muted-foreground truncate">{athlete.province}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {athlete.overallScore} pts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
      </div>
    </div>
  );
}
