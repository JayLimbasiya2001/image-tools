import { Seo } from "../seo/Seo";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About Pixeloop Tools"
        description="Learn how Pixeloop Tools compresses, resizes and converts images entirely in your browser without uploading them to a server."
        path="/about"
      />
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          About Pixeloop Tools
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          Pixeloop Tools was built for creators, developers and marketers who need fast,
          reliable image optimization without handing files to third-party servers. All
          processing happens locally in your browser using modern JavaScript and the HTML5
          canvas API.
        </p>
        <p className="text-sm md:text-base text-slate-300">
          Because nothing is uploaded, your images never leave your device. That makes
          Pixeloop Tools ideal for working with private screenshots, client work, and
          sensitive assets that should not be stored online.
        </p>
        <h2 className="text-xl font-semibold text-slate-50 mt-4">
          Focused on performance &amp; SEO
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          The app is designed with Core Web Vitals in mind: minimal JavaScript on first
          load, code-splitting for individual tools, and a lightweight Tailwind-based UI.
          Each tool has its own SEO-friendly URL, optimized meta tags, and helpful content
          so your favorite tools are easy to find via search.
        </p>
      </section>
    </>
  );
}

