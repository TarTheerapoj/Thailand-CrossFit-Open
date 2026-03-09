import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SUMMARY_STATS } from "@/lib/data/workouts";
import ParticipationChart from "@/components/charts/ParticipationChart";
import AffiliateGrowthChart from "@/components/charts/AffiliateGrowthChart";
import OpenRegistrationChart from "@/components/charts/OpenRegistrationChart";
import { SparklineBar } from "@/components/charts/SparklineBar";

const latest = SUMMARY_STATS.participationByYear[SUMMARY_STATS.participationByYear.length - 1];
const prev   = SUMMARY_STATS.participationByYear[SUMMARY_STATS.participationByYear.length - 2];
const athleteGrowthPct = Math.round(((latest.total - prev.total) / prev.total) * 100);
const affiliateData = [11, 13, 16, 19, 24];

export default function DashboardPage() {
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

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Athletes card */}
        <Card className="border-border/50 bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">นักกีฬาทั้งหมด</p>
                <p className="text-3xl font-black mt-0.5">
                  {SUMMARY_STATS.totalAthletes.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">คน</span>
                </p>
              </div>
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ backgroundColor: "#9BEC00", color: "#111" }}>
                +{athleteGrowthPct}% vs 2025
              </span>
            </div>
            {/* Men/Women split */}
            <div className="flex gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                <span className="text-xs text-muted-foreground">ชาย</span>
                <span className="text-xs font-bold">{latest.men}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400 inline-block" />
                <span className="text-xs text-muted-foreground">หญิง</span>
                <span className="text-xs font-bold">{latest.women}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="text-[10px] text-muted-foreground">
                  ชาย {Math.round((latest.men / latest.total) * 100)}% · หญิง {Math.round((latest.women / latest.total) * 100)}%
                </span>
              </div>
            </div>
            {/* Proportion bar */}
            <div className="flex w-full h-1.5 rounded-full overflow-hidden">
              <div style={{ width: `${Math.round((latest.men / latest.total) * 100)}%`, backgroundColor: "#3b82f6" }} />
              <div style={{ width: `${Math.round((latest.women / latest.total) * 100)}%`, backgroundColor: "#f472b6" }} />
            </div>
          </CardContent>
        </Card>

        {/* Affiliate card */}
        <Card className="border-border/50 bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">CrossFit Affiliate</p>
                <p className="text-3xl font-black mt-0.5">
                  {SUMMARY_STATS.totalAffiliates}
                  <span className="text-sm font-normal text-muted-foreground ml-1">แห่ง</span>
                </p>
              </div>
              <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                +118% ใน 4 ปี
              </span>
            </div>
            {/* Sparkline */}
            <p className="text-[10px] text-muted-foreground mb-1.5">การเติบโต 2022–2026</p>
            <SparklineBar data={affiliateData} color="#3b82f6" />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>2022 · 11</span>
              <span>2023 · 13</span>
              <span>2024 · 16</span>
              <span>2025 · 19</span>
              <span className="font-bold text-blue-600">2026 · 24</span>
            </div>
          </CardContent>
        </Card>

      </section>

      {/* Participation chart */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">การเติบโตของผู้เข้าร่วม</CardTitle>
          <p className="text-xs text-muted-foreground">จำนวนนักกีฬาในแต่ละปี (2017–2026) · แยกตามเพศหรือดูรวม</p>
        </CardHeader>
        <CardContent>
          <ParticipationChart data={SUMMARY_STATS.participationByYear} />
        </CardContent>
      </Card>
      </div>

      {/* ─── INSIGHT SECTION ─────────────────────────────────── */}
      <section className="bg-[#111] text-white">
        <div className="absolute left-0 right-0 h-px" style={{ backgroundColor: "#9BEC00", opacity: 0.15 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: "#9BEC00" }}>Insight</span>
            <div className="h-px flex-1 max-w-12" style={{ backgroundColor: "#9BEC00", opacity: 0.3 }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            สัญญาณใหม่ของ <span style={{ color: "#9BEC00" }}>CrossFit Thailand</span>
          </h2>
          <p className="text-white/40 text-sm mb-8">
            CrossFit ไทยอาจกำลังเคลื่อนจากกีฬาของคนวงใน ไปสู่ตลาดเฉพาะทางที่มีแรงส่งมากขึ้น คำถามสำคัญจึงไม่ใช่โตหรือไม่ แต่โตแบบไหน และยั่งยืนเพียงใด
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mb-10 pb-8 border-b border-white/10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0" style={{ backgroundColor: "#9BEC00", color: "#111" }}>ต้า</div>
            <div>
              <p className="text-sm font-bold text-white">ต้า ธีระพจน์ งามเลิศไพโรจน์</p>
              <p className="text-xs text-white/40">Certified CrossFit Lv.2 · Coach at IAOT CrossFit, Ontrack Station</p>
            </div>
          </div>

          {/* Article body + charts */}
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left: article text */}
            <div className="lg:col-span-3 space-y-5 text-[15px] text-white/75 leading-relaxed">
              <p>สำหรับตัวผม กีฬา CrossFit เติบโตจากคอมมูนิตี้มากกว่าจากแมสมีเดีย จุดเปลี่ยนสำคัญมักไม่ใช่วันที่คนพูดถึงมันเยอะขึ้น แต่คือวันที่ <span className="text-white font-semibold">"มีคนลงแข่งขัน"</span> และ <span className="text-white font-semibold">"พบเจอสถานที่ฝึกซ้อม งานแข่งขัน"</span> เริ่มขยับเพิ่มขึ้นพร้อมกันอย่างมีนัยสำคัญ</p>

              <p>ในเชิงข้อมูลตรงๆ กราฟแรกบอกว่า จำนวนผู้ลงทะเบียน CrossFit Open ในไทยเพิ่มจาก <span className="font-bold" style={{ color: "#9BEC00" }}>170 คนในปี 2017 เป็น 604 คนในปี 2026</span> แต่เส้นทางนี้ไม่ได้เป็นเส้นตรงแบบสวยงามตลอดทาง ปี 2018 เคยขึ้นไปถึง 269 ก่อนจะถอยลงในปี 2019 และลงลึกสุดที่ 146 ในปี 2020 จากนั้นค่อยๆ ฟื้นตัวในช่วง 2021–2024 ก่อนจะ<span className="text-white font-semibold">เร่งชันอย่างชัดเจน</span>ในปี 2025 ที่ 360 และกระโดดอีกครั้งในปี 2026 ที่ 604</p>

              <p>กราฟที่สองบอกอีกเรื่องหนึ่ง แต่สำคัญไม่แพ้กัน: จำนวน CrossFit affiliate ในไทยเพิ่มจาก <span className="font-bold" style={{ color: "#9BEC00" }}>11 แห่งในปี 2022 เป็น 24 แห่งในปี 2026</span> หรือเท่ากับเพิ่มขึ้น 100% ในเวลาเพียงสี่ปี และที่สำคัญคือ<span className="text-white font-semibold">ไม่มีปีไหนติดลบเลย</span> เส้นนี้ไม่หวือหวาเท่าจำนวนคนลง Open แต่มีคุณค่ามากในฐานะ<span className="text-white font-semibold">สัญญาณเชิงโครงสร้าง</span></p>

              <p>ในปี 2025–2026 คือภาพอีกแบบหนึ่งเลย นี่ไม่ใช่การไต่ขึ้นแบบช้าๆ ตามปกติอีกแล้ว แต่มีลักษณะของ <span className="text-white font-semibold">step-change</span> หรือการเปลี่ยนระดับของตลาด ตัวเลขจาก 232 ไป 360 และ 604 ภายในสองปี ไม่ใช่แค่การฟื้นหลังโรคระบาดในเชิงพื้นฐาน แต่บอกว่าความสามารถในการดึงคนเข้าสู่ CrossFit Open เริ่มขยายตัวเร็วกว่าจากเดิมในอดีต</p>

              {/* Pull quote */}
              <blockquote className="border-l-2 pl-4 py-1 my-6" style={{ borderColor: "#9BEC00" }}>
                <p className="text-base font-semibold text-white leading-snug">"ไทยกำลังเห็นทั้ง participation และ infrastructure โตพร้อมกัน แต่ด้วยความเร็วไม่เท่ากัน — และนั่นคือสัญญาณที่แข็งแรง"</p>
              </blockquote>

              <p>ในเชิงธุรกิจกีฬา จำนวนคนลง Open กับจำนวน affiliate ไม่ใช่ตัวเลขชนิดเดียวกัน ตัวแรกสะท้อน <span className="text-white font-semibold">participation demand</span> ตัวหลังสะท้อน <span className="text-white font-semibold">infrastructure</span> ตลาดกีฬาใดก็ตามที่มีแต่ demand แต่ไม่มี infrastructure รองรับ มักโตได้ไม่นาน</p>

              <p>สิ่งที่กราฟกำลังบอกจริงๆ คือ CrossFit ไทยอาจกำลังโตแบบมีฐานมากขึ้นกว่าเดิม — ไม่ใช่โตจากกระแสอย่างเดียว ไม่ใช่โตจากภาพลักษณ์อย่างเดียว แต่<span className="text-white font-semibold">โตจากการที่ทั้ง participation และ infrastructure เริ่มส่งสัญญาณไปในทิศทางเดียวกัน</span></p>
            </div>

            {/* Right: charts */}
            <div className="lg:col-span-2 space-y-8">

              {/* Chart 1: Open registration */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: "#9BEC00" }}>CrossFit Open Thailand</p>
                <p className="text-sm font-bold text-white mb-1">ผู้ลงทะเบียน 2017–2026</p>
                <p className="text-[11px] text-white/40 mb-4">170 คน → 604 คน · +255% overall · +160% ตั้งแต่ 2024</p>
                <OpenRegistrationChart />
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <span className="w-3 h-px bg-red-400 inline-block opacity-60" />COVID-19 (2020)
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <span className="w-3 h-px bg-yellow-400 inline-block opacity-60" />Physical: 100 (2023, 2024)
                  </span>
                </div>
              </div>

              {/* Chart 2: Affiliate growth */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-[10px] font-black tracking-widest uppercase mb-1" style={{ color: "#9BEC00" }}>CrossFit Affiliates Thailand</p>
                <p className="text-sm font-bold text-white mb-1">จำนวน Affiliate 2022–2026</p>
                <p className="text-[11px] text-white/40 mb-4">11 แห่ง → 24 แห่ง · +118% · ไม่มีปีถอยหลัง</p>
                <AffiliateGrowthChart />
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "+255%", l: "Open registrations\n2017→2026" },
                  { v: "+118%", l: "Affiliate growth\n2022→2026" },
                  { v: "×2.6", l: "เร็วกว่า 2024\nใน 2 ปีล่าสุด" },
                  { v: "0", l: "ปีที่ affiliate\nถอยหลัง" },
                ].map(({ v, l }) => (
                  <div key={v+l} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-xl font-black" style={{ color: "#9BEC00" }}>{v}</p>
                    <p className="text-[11px] text-white/40 mt-0.5 whitespace-pre-line leading-tight">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
