import { PropsWithChildren } from "react";
import { AdSlot } from "./AdSlot";

interface ToolLayoutProps extends PropsWithChildren {
  title: string;
  intro: string;
}

export function ToolLayout({ title, intro, children }: ToolLayoutProps) {
  return (
    <section aria-labelledby="tool-title" className="space-y-6">
      <header className="space-y-3">
        <h1
          id="tool-title"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50"
        >
          {title}
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl">{intro}</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr),minmax(0,0.9fr)] items-start">
        <div className="space-y-6">{children}</div>
        <AdSlot position="sidebar" />
      </div>
    </section>
  );
}

