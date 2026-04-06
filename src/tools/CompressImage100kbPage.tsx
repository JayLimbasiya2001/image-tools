import { useMemo, useState } from "react";
import imageCompression from "browser-image-compression";
import { Seo } from "../seo/Seo";
import { ToolLayout } from "../components/layout/ToolLayout";
import { ImageDropzone } from "../components/image/ImageDropzone";
import { useImageFile } from "../hooks/useImageFile";
import { ImagePreview } from "../components/image/ImagePreview";
import { ResultActions } from "../components/image/ResultActions";
import { AdSlot } from "../components/layout/AdSlot";
import { RelatedTools } from "../components/layout/RelatedTools";
import { formatBytes } from "../utils/fileUtils";
import { siteBaseUrl, siteName } from "../seo/seoConfig";

function buildFaq(targetKb: number) {
  return [
    {
      q: `How to compress image to ${targetKb}KB online?`,
      a: `Upload your image, keep the target at ${targetKb}KB, click compress, preview the result, then download. Processing stays in your browser.`,
    },
    {
      q: "Does compression reduce quality?",
      a: "It can. To hit a strict size like 50KB or 100KB the tool may lower quality. If the preview looks soft, try a higher target size or resize dimensions first.",
    },
    {
      q: "Which format is best: JPG, PNG, or WebP?",
      a: "For photos, JPG or WebP usually produces the smallest files. For transparency and sharp graphics, PNG is common but often larger; WebP can be a good alternative.",
    },
    {
      q: "Is this tool free?",
      a: "Yes. Pixeloop Tools is free to use with no sign-up and no watermark.",
    },
    {
      q: "Is my image secure?",
      a: "Yes. Your image is processed locally in the browser and is not uploaded to a server.",
    },
    {
      q: "Can I use this for passport photos or government forms?",
      a: "Often yes. Many portals require a max file size like 50KB, 100KB, or 200KB. Always verify the final file size, dimensions, and format requirements before submitting.",
    },
    {
      q: `Why is my image still above ${targetKb}KB after compressing?`,
      a: "Some images can’t reach very small sizes without heavy quality loss (large, detailed photos or PNG screenshots). Resize first, then compress again, or increase the target KB slightly.",
    },
  ];
}

function toFaqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function toolAppSchema(urlPath: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: `${siteBaseUrl}${urlPath}`,
  };
}

export function CompressImageKbPage({
  defaultTargetKb,
  urlPath,
}: {
  defaultTargetKb: number;
  urlPath: "/compress-image-to-50kb" | "/compress-image-to-100kb";
}) {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [targetKb, setTargetKb] = useState(defaultTargetKb);

  const faq = useMemo(() => buildFaq(defaultTargetKb), [defaultTargetKb]);
  const faqSchema = useMemo(() => toFaqSchema(faq), [faq]);
  const pageTitle =
    defaultTargetKb === 50
      ? "Compress Image to 50KB Online Free (Fast & Secure)"
      : "Compress Image to 100KB Online Free (Fast & Secure)";
  const metaDescription =
    defaultTargetKb === 50
      ? "Compress an image to 50KB online fast. Free and secure—files stay in your browser. Great for passport photos, forms, and strict upload limits."
      : "Compress an image to 100KB online in seconds. Fast, free, and secure—your files stay in your browser. Perfect for forms, passports, and uploads.";

  const handleCompress = async () => {
    if (!primaryFile) return;
    setProcessing(true);
    try {
      const options = {
        maxSizeMB: Math.max(0.02, targetKb / 1024),
        useWebWorker: true,
      };
      const compressedBlob = await imageCompression(primaryFile, options);
      const compressedFile = new File([compressedBlob], primaryFile.name, {
        type: compressedBlob.type,
      });
      setResultFile(compressedFile);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={metaDescription}
        path={urlPath}
        keywords={[
          `compress image to ${defaultTargetKb}kb online`,
          `reduce image size to ${defaultTargetKb}kb`,
          "reduce image size without losing quality",
          "image compressor for government forms",
          "passport photo size reducer",
          "compress jpg without losing quality",
        ]}
        jsonLd={[
          faqSchema,
          toolAppSchema(urlPath, `${siteName} – Compress Image to ${defaultTargetKb}KB`),
        ]}
      />

      <ToolLayout
        title={`Compress Image to ${defaultTargetKb}KB Online Free`}
        intro={`Need to compress an image to ${defaultTargetKb}KB for a form or upload limit? This free tool runs entirely in your browser—fast, secure, and privacy-friendly.`}
      >
        <div className="space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-100">
                  Upload and compress to a target size
                </p>
                <p className="text-[11px] text-slate-400">
                  If quality looks too low at {defaultTargetKb}KB, try 150KB or resize first.
                </p>
              </div>
              <a
                href="/tools/image-resizer"
                className="text-[11px] text-brand-300 hover:text-brand-200"
              >
                Resize first →
              </a>
            </div>

            <ImageDropzone onFiles={onFiles} multiple={false} />
            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {primaryFile && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-300">
                    Original size:{" "}
                    <span className="font-medium">{formatBytes(primaryFile.size)}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      clear();
                      setResultFile(null);
                      setTargetKb(defaultTargetKb);
                    }}
                    className="text-[11px] text-slate-400 hover:text-brand-300"
                  >
                    Remove image
                  </button>
                </div>

                <div className="space-y-2 max-w-xs">
                  <label className="flex items-center justify-between text-xs text-slate-300">
                    Target size
                    <span className="text-[11px] text-slate-400">{targetKb} KB</span>
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={300}
                    step={10}
                    value={targetKb}
                    onChange={(e) => setTargetKb(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={processing}
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
                >
                  {processing ? "Compressing…" : `Compress to ~${targetKb}KB`}
                </button>
              </div>
            )}
          </div>

          {primaryFile && (
            <>
              <ImagePreview file={primaryFile} processedFile={resultFile} />
              <ResultActions file={resultFile ?? primaryFile} processing={processing} />
            </>
          )}
        </div>

        <article className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-50">
            What does “compress to {defaultTargetKb}KB” mean?
          </h2>
          <p className="text-sm text-slate-300">
            When a website asks you to upload an image under {defaultTargetKb}KB, it’s enforcing
            a maximum file size. This is common for government forms, admissions portals, and
            passport photo uploads. Compressing reduces the amount of data stored in the image
            file while keeping the photo readable and acceptable.
          </p>
          <p className="text-sm text-slate-300">
            There are two levers you can use: compression settings (quality/encoding) and image
            dimensions (width and height in pixels). The fastest path is usually to resize first
            if the photo is very large, then compress to hit the KB limit.
          </p>

          <h2 className="text-xl font-semibold text-slate-50">
            How to compress an image to {defaultTargetKb}KB online
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
            <li>Upload your image using the tool above.</li>
            <li>Keep the target at {defaultTargetKb}KB (or adjust if your portal allows a different limit).</li>
            <li>Click “Compress” and preview the result.</li>
            <li>Download the optimized file and verify the final size before submitting.</li>
          </ol>

          <h2 className="text-xl font-semibold text-slate-50">Why use Pixeloop Tools?</h2>
          <p className="text-sm text-slate-300">
            Pixeloop Tools is built for speed, privacy, and convenience. All processing runs in
            your browser, so your files are not uploaded to any server. This is especially
            useful when compressing personal documents or ID photos.
          </p>

          <AdSlot position="inline" />

          <h2 className="text-xl font-semibold text-slate-50">Supported formats</h2>
          <p className="text-sm text-slate-300">
            You can upload JPG, PNG, and WebP images. For best compression, photos typically
            perform best in JPG or WebP. If you need to convert formats, try{" "}
            <a className="text-brand-300 hover:text-brand-200" href="/tools/image-format-converter">
              Image Format Converter
            </a>{" "}
            or convert JPG/PNG to WebP using{" "}
            <a className="text-brand-300 hover:text-brand-200" href="/tools/image-to-webp">
              Image to WebP
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-slate-50">
            Tips to reduce image size without losing quality
          </h2>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
            <li>
              <strong>Resize first</strong>: If your image is 4000px wide, resizing to 1200–2000px
              often reduces size dramatically with minimal visible impact.
            </li>
            <li>
              <strong>Pick the right format</strong>: WebP is often smaller than JPG/PNG for similar
              quality, which helps you hit strict KB limits.
            </li>
            <li>
              <strong>Avoid re-compressing multiple times</strong>: Start from the original file when possible.
            </li>
            <li>
              <strong>Use the smallest acceptable target</strong>: If {defaultTargetKb}KB looks too soft, try a slightly larger size if allowed.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-50">FAQs</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="glass-panel p-4">
                <summary className="cursor-pointer text-sm font-medium text-slate-100">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>

          <RelatedTools />
        </article>
      </ToolLayout>
    </>
  );
}

export default function CompressImage100kbPage() {
  return <CompressImageKbPage defaultTargetKb={100} urlPath="/compress-image-to-100kb" />;
}

