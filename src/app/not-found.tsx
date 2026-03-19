import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: "#9BEC00" }} />
      <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-4" style={{ color: "#9BEC00" }}>
        CrossFit Open 2026 · Thailand
      </p>
      <h1 className="text-[8rem] font-black leading-none text-white/10 select-none">404</h1>
      <p className="text-2xl font-black tracking-tight text-white -mt-4">ไม่พบหน้านี้</p>
      <p className="text-white/40 text-sm mt-3 max-w-xs">
        หน้าที่คุณต้องการอาจถูกย้าย หรือยังไม่มีในระบบ
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest uppercase transition-all hover:opacity-90"
        style={{ backgroundColor: "#9BEC00", color: "#111" }}
      >
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
