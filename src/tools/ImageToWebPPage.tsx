import { useState } from "react";
import { Seo } from "../seo/Seo";
import { ToolLayout } from "../components/layout/ToolLayout";
import { ImageDropzone } from "../components/image/ImageDropzone";
import { useImageFile } from "../hooks/useImageFile";
import { ImagePreview } from "../components/image/ImagePreview";
import { ResultActions } from "../components/image/ResultActions";
import { AdSlot } from "../components/layout/AdSlot";
import { canvasToBlob, drawToCanvas, loadImageFromFile } from "../utils/canvasUtils";
import { blobToFile } from "../utils/fileUtils";

export default function ImageToWebPPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [quality, setQuality] = useState(0.8);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if (!primaryFile) return;
    setProcessing(true);
    try {
      const image = await loadImageFromFile(primaryFile);
      const canvas = drawToCanvas(image, image.naturalWidth, image.naturalHeight, 0);
      const blob = await canvasToBlob(canvas, "image/webp", quality);
      const file = blobToFile(blob, primaryFile, "webp");
      setResultFile(file);
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
        title="Image to WebP Converter – Convert PNG or JPG to WebP"
        description="Convert PNG or JPG images to modern WebP format entirely in your browser. No uploads, no watermarks—just fast image to WebP conversion."
        path="/tools/image-to-webp"
        keywords={[
          "image to webp",
          "convert png to webp",
          "convert jpg to webp",
          "online webp converter",
        ]}
      />
      <ToolLayout
        title="Image to WebP Converter"
        intro="Turn heavy PNG or JPG images into lightweight WebP files. Improve website performance and Core Web Vitals with modern image formats that load faster."
      >
        <div className="space-y-4">
          <ImageDropzone onFiles={onFiles} multiple={false} />
          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {primaryFile && (
            <div className="glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-300">
                  This tool converts your image to WebP format directly in your browser.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] text-slate-400 hover:text-brand-300"
                >
                  Remove image
                </button>
              </div>
              <div className="space-y-2 max-w-xs">
                <label className="flex items-center justify-between text-xs text-slate-300">
                  WebP quality
                  <span className="text-[11px] text-slate-400">
                    {(quality * 100).toFixed(0)}%
                  </span>
                </label>
                <input
                  type="range"
                  min={0.3}
                  max={0.95}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                type="button"
                onClick={handleConvert}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Converting…" : "Convert to WebP"}
              </button>
            </div>
          )}
          {primaryFile && (
            <>
              <ImagePreview file={primaryFile} processedFile={resultFile} />
              <ResultActions file={resultFile ?? primaryFile} processing={processing} />
              <AdSlot position="inline" />
            </>
          )}
        </div>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-50">
            How to convert images to WebP
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your JPG or PNG file into the upload area.</li>
            <li>Adjust the WebP quality slider if you want smaller files.</li>
            <li>Click &ldquo;Convert to WebP&rdquo; and wait a moment.</li>
            <li>Preview and download your new WebP image.</li>
          </ol>
          <section className="space-y-3 mt-4">
            <h2 className="text-lg font-semibold text-slate-50">
              WebP conversion FAQ
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h3 className="font-medium text-slate-100">
                  Why convert images to WebP?
                </h3>
                <p>
                  WebP images are usually smaller than JPEG or PNG with similar visual
                  quality. They help web pages load faster and improve Core Web Vitals.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  How do I convert PNG to WebP?
                </h3>
                <p>
                  Simply upload the PNG file to this tool, choose your preferred quality
                  and click convert. You will get a downloadable WebP version instantly.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Are my images uploaded anywhere?
                </h3>
                <p>
                  No. All conversion runs locally in your browser using the HTML canvas
                  API, so your images remain private.
                </p>
              </div>
            </div>
          </section>
        </section>
      </ToolLayout>
    </>
  );
}

