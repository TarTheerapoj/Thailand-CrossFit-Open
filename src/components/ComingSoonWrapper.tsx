import { type ReactNode } from "react";
import { Clock } from "lucide-react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ComingSoonWrapper({ title, description, children }: Props) {
  return (
    <div className="relative">
      {/* Blurred teaser content */}
      <div className="pointer-events-none select-none blur-sm opacity-40">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-6 py-8 max-w-sm mx-auto">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
            style={{ backgroundColor: "#9BEC00" }}
          >
            <Clock className="w-7 h-7" style={{ color: "#111" }} />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              className="text-[10px] font-black tracking-[0.3em] uppercase px-2 py-0.5 rounded"
              style={{ backgroundColor: "#111", color: "#9BEC00" }}
            >
              COMING SOON
            </span>
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2 tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          <div className="mt-6 flex justify-center gap-1.5">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: i === 0 ? "#9BEC00" : "#ccc",
                  opacity: i === 0 ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
