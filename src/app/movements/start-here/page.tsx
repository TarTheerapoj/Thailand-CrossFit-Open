import Link from "next/link";
import { ChevronRight, ArrowRight, BookOpen, Zap, Dumbbell, Star } from "lucide-react";
import {
  getMovementBySlug,
  DIFFICULTY_LABEL,
  CATEGORY_COLOR,
  type MovementCatalogEntry,
} from "@/lib/data/movements";

const ACCENT = "#9BEC00";

// ── Pathway definitions ───────────────────────────────────────────────────────

interface Pathway {
  id: string;
  emoji: string;
  title: string;
  titleTH: string;
  subtitle: string;
  color: string;
  movementSlugs: string[];
  note: string;
}

const PATHWAYS: Pathway[] = [
  {
    id: "new-to-crossfit",
    emoji: "🏁",
    title: "New to CrossFit",
    titleTH: "เริ่มต้น CrossFit",
    subtitle: "ท่าพื้นฐาน 5 ท่าที่ต้องทำให้ได้ก่อนทุกสิ่ง",
    color: ACCENT,
    movementSlugs: ["air-squat", "push-up", "burpee", "ring-row", "double-under"],
    note:
      "CrossFit ทุก workout สร้างขึ้นจากท่าเหล่านี้ ถ้าทำ 5 ท่านี้ได้ดี คุณพร้อมสำหรับ Scaled WOD แล้ว",
  },
  {
    id: "learn-pull-up",
    emoji: "💪",
    title: "Learn Pull-Up",
    titleTH: "เรียนรู้พูลอัพ",
    subtitle: "เส้นทางจาก Ring Row ไปถึง Chest-to-Bar",
    color: "#3b82f6",
    movementSlugs: ["ring-row", "strict-pull-up", "kipping-pull-up", "chest-to-bar"],
    note:
      "Pull-up เป็นท่าหลักใน CrossFit Open เกือบทุกปี เรียนตามลำดับนี้เพื่อสร้าง foundation ที่แข็งแรงและป้องกัน injury",
  },
  {
    id: "barbell-basics",
    emoji: "🏋️",
    title: "Barbell Basics",
    titleTH: "พื้นฐาน Barbell",
    subtitle: "ก่อนจะ Clean & Jerk ต้องผ่านสิ่งเหล่านี้",
    color: "#f59e0b",
    movementSlugs: ["front-squat", "power-clean", "squat-clean", "power-snatch"],
    note:
      "Olympic lifting ต้องการเวลาในการฝึก ถ้ายัง Front Squat ไม่แข็งแรง ควรเริ่มที่นั่นก่อน ไม่รีบเพิ่มน้ำหนัก",
  },
  {
    id: "gymnastics-skills",
    emoji: "🤸",
    title: "Gymnastics Skills",
    titleTH: "ทักษะ Gymnastics",
    subtitle: "Strict ก่อนเสมอ — strength before kipping",
    color: "#a855f7",
    movementSlugs: ["push-up", "strict-pull-up", "toes-to-bar", "handstand-push-up"],
    note:
      "Gymnastics ใน CrossFit คือการเคลื่อนร่างกาย ไม่ใช่แค่ท่า fancy — ทำ strict ให้ได้ก่อน แล้วค่อยเพิ่ม kipping",
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function DifficultyPip({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: i <= level ? color : "#e5e7eb" }}
        />
      ))}
    </div>
  );
}

function MovementStep({
  entry,
  index,
  color,
  isLast,
}: {
  entry: MovementCatalogEntry;
  index: number;
  color: string;
  isLast: boolean;
}) {
  const hasDetail = "shortDesc" in entry && !!(entry as { shortDesc?: string }).shortDesc;
  const catColor = CATEGORY_COLOR[entry.category];

  return (
    <div className="flex items-start gap-3">
      {/* Step number + connector */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
          style={{ backgroundColor: color, color: color === ACCENT ? "#111" : "white" }}
        >
          {index + 1}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-1 mb-1 min-h-[20px]" style={{ backgroundColor: `${color}30` }} />
        )}
      </div>

      {/* Card */}
      <Link
        href={`/movements/${entry.slug}`}
        className="group flex-1 mb-3 flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-300 hover:shadow-sm transition-all"
      >
        <div className="min-w-0">
          <p className="font-black text-sm text-gray-900 leading-tight">{entry.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <DifficultyPip level={entry.difficulty} color={color} />
            <span className="text-[10px] text-gray-400 font-medium">{DIFFICULTY_LABEL[entry.difficulty]}</span>
            {entry.equipment.length === 0 && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-bold">
                ไม่ต้องอุปกรณ์
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {hasDetail ? (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
              style={{ backgroundColor: `${catColor}15`, color: catColor }}
            >
              มี Detail
            </span>
          ) : (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">
              Catalog
            </span>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
        </div>
      </Link>
    </div>
  );
}

function PathwayCard({ pathway }: { pathway: Pathway }) {
  const movements = pathway.movementSlugs
    .map(slug => getMovementBySlug(slug))
    .filter((m): m is MovementCatalogEntry => !!m);

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{ backgroundColor: `${pathway.color}08`, borderBottom: `2px solid ${pathway.color}20` }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">{pathway.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-gray-900">{pathway.title}</h2>
              <span
                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${pathway.color}20`, color: pathway.color }}
              >
                {pathway.titleTH}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{pathway.subtitle}</p>
          </div>
          <span
            className="shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${pathway.color}15`, color: pathway.color }}
          >
            {movements.length} ท่า
          </span>
        </div>
        <div
          className="mt-4 p-3 rounded-lg text-xs leading-relaxed text-gray-600 border-l-2"
          style={{ borderColor: pathway.color, backgroundColor: `${pathway.color}06` }}
        >
          {pathway.note}
        </div>
      </div>

      {/* Movement steps */}
      <div className="px-6 py-5">
        {movements.map((m, i) => (
          <MovementStep
            key={m.slug}
            entry={m}
            index={i}
            color={pathway.color}
            isLast={i === movements.length - 1}
          />
        ))}
        {/* CTA */}
        <div className="mt-2 pt-4 border-t border-gray-100">
          <Link
            href={`/movements?category=all`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-700 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            ดู Movement Library ทั้งหมด
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StartHerePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f6f8" }}>

      {/* Hero */}
      <section className="bg-[#111] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: ACCENT }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-bold uppercase tracking-widest mb-5 flex-wrap">
            <Link href="/movements" className="hover:text-white/70 transition-colors">
              Movement Library
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: ACCENT }}>Start Here</span>
          </div>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5" style={{ color: ACCENT }} />
                <span
                  className="text-[10px] font-black tracking-[0.25em] uppercase"
                  style={{ color: ACCENT }}
                >
                  Guided Entry
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                <span style={{ color: ACCENT }}>เริ่มต้น</span> จากที่นี่
              </h1>
              <p className="text-white/40 text-sm mt-2 max-w-xl leading-relaxed">
                เลือก pathway ที่ตรงกับเป้าหมายของคุณ แต่ละเส้นทางมี 3–5 ท่าสำคัญ
                เรียงตามลำดับที่เหมาะสมที่สุดสำหรับการฝึก
              </p>
            </div>
            {/* Stats */}
            <div className="flex gap-6 flex-wrap">
              {[
                { icon: Star, label: "Pathways", value: PATHWAYS.length },
                { icon: Dumbbell, label: "Key Movements", value: PATHWAYS.reduce((s, p) => s + p.movementSlugs.length, 0) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-right">
                  <p className="text-2xl font-black" style={{ color: ACCENT }}>{value}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: ACCENT, color: "#111" }}>!</div>
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">วิธีใช้:</strong> เลือก pathway ที่ตรงกับคุณที่สุด คลิกแต่ละท่าเพื่อดู coaching detail, common faults และ progressions
            ถ้าไม่แน่ใจว่าจะเริ่มที่ไหน ให้เริ่ม <strong className="text-gray-700">New to CrossFit</strong>
          </p>
        </div>
      </div>

      {/* Pathways grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PATHWAYS.map(pathway => (
            <PathwayCard key={pathway.id} pathway={pathway} />
          ))}
        </div>

        {/* Back to library */}
        <div className="mt-10 text-center">
          <Link
            href="/movements"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Movement Library ทั้งหมด {/* full catalog */}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
