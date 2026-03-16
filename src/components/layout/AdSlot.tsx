import { useEffect } from "react";

interface AdSlotProps {
  position: "top" | "sidebar" | "inline";
}

export function AdSlot({ position }: AdSlotProps) {
  const base =
    "border border-dashed border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-center rounded-lg";

  useEffect(() => {
    if (position !== "top") return;
    if (typeof document === "undefined") return;
    if ((window as any).__hilltopLoaded) return;
    const d = document;
    const s = d.createElement("script");
    const l = d.scripts[d.scripts.length - 1];
    (s as any).settings = {};
    s.src =
      "//sophisticatedpin.com/bVXDVtsed.G/lX0fYGWwcY/-e/m/9/umZYUXlWkKPuTtYU4vNKzjQ/5CNKTycKt/NhjSgv3/NKDjkc2HM/QL";
    s.async = true;
    s.referrerPolicy = "no-referrer-when-downgrade";
    const parent = l.parentNode ?? d.head ?? d.body;
    parent?.insertBefore(s, l);
    (window as any).__hilltopLoaded = true;
  }, [position]);

  if (position === "top") {
    return (
      <div className="border-b border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-center">
          <div
            id="hilltop-top-banner"
            className={`${base} h-[250px] w-full max-w-[300px] bg-slate-900/60`}
          >
            Banner ad space (300x250)
          </div>
        </div>
      </div>
    );
  }

  if (position === "sidebar") {
    return (
      <aside
        className={`${base} h-64 w-full bg-slate-900/60 sticky top-24`}
        aria-label="Sidebar advertisement slot"
      >
        Sidebar ad space (300x600)
      </aside>
    );
  }

  return (
    <div
      className={`${base} h-24 w-full bg-slate-900/60`}
      aria-label="Inline advertisement slot"
    >
      Inline ad space (responsive)
    </div>
  );
}

