import { Link } from "react-router-dom";
import { toolRoutes } from "../../router";

const DEFAULT_TOOL_PATHS = [
  "/tools/image-compressor",
  "/tools/image-resizer",
  "/tools/image-format-converter",
  "/tools/image-crop",
];

export function RelatedTools({
  paths = DEFAULT_TOOL_PATHS,
}: {
  paths?: string[];
}) {
  const items = paths
    .map((p) => toolRoutes.find((t) => t.path === p))
    .filter(Boolean) as Array<(typeof toolRoutes)[number]>;

  return (
    <section className="glass-panel p-5 space-y-3" aria-label="Try other tools">
      <h2 className="text-sm font-semibold text-slate-100">Try Other Tools</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <Link
            key={it.path}
            to={it.path}
            className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:bg-brand-600 hover:text-white transition"
          >
            {it.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

