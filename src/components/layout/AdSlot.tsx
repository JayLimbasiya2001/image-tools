interface AdSlotProps {
  position: "top" | "sidebar" | "inline";
}

export function AdSlot({ position }: AdSlotProps) {
  const base =
    "border border-dashed border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-center rounded-lg";

  if (position === "top") {
    return (
      <div className="border-t border-slate-900/80 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className={`${base} h-14 w-full bg-slate-900/60`}>
            Banner ad space (728x90)
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

