import { Link } from "react-router-dom";
import { toolRoutes } from "../router";
import { Seo } from "../seo/Seo";

export function HomePage() {
  return (
    <>
      <Seo
        title="Free Online Image Tools – Compress, Resize, Convert in Your Browser"
        description="Use Pixeloop Tools to compress, resize, crop, rotate and convert images entirely in your browser. No upload, no watermark, fast and privacy-friendly."
        path="/"
        keywords={[
          "online image tools",
          "image compressor",
          "image resizer",
          "webp converter",
          "bulk image compression",
        ]}
      />
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-start">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
            Free online image tools that run entirely in your browser.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-xl">
            Pixeloop Tools helps you compress, resize, crop, rotate, and convert images
            instantly. No sign-up, no uploads, and no watermarks—just fast, secure,
            privacy-first image editing.
          </p>
          <ul className="text-xs md:text-sm text-slate-300 space-y-1">
            <li>• All processing happens locally in your browser.</li>
            <li>• Perfect for quick one-off optimizations and bulk image tasks.</li>
            <li>• Optimized for Core Web Vitals and SEO-friendly URLs.</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tools/image-compressor"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition"
            >
              Start compressing images
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:border-brand-500 hover:text-brand-300 transition"
            >
              Learn how it works
            </Link>
          </div>
        </div>
        <div className="glass-panel p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-100">
            Popular image tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {toolRoutes.slice(0, 6).map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group rounded-xl bg-slate-900/70 border border-slate-800/80 px-3 py-3 hover:border-brand-500/80 hover:bg-slate-900 transition flex flex-col gap-1"
              >
                <span className="font-medium text-slate-100 group-hover:text-brand-200">
                  {tool.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  {tool.shortDescription}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-slate-50">
          All free online image tools
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {toolRoutes.map((tool) => (
            <article
              key={tool.path}
              className="glass-panel p-4 flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-400">{tool.shortDescription}</p>
              </div>
              <Link
                to={tool.path}
                className="inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:bg-brand-600 hover:text-white transition self-start"
              >
                Open tool
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

