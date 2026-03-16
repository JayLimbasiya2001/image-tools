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

export default function WebPToPngPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if (!primaryFile) return;
    setProcessing(true);
    try {
      const image = await loadImageFromFile(primaryFile);
      const canvas = drawToCanvas(image, image.naturalWidth, image.naturalHeight, 0);
      const blob = await canvasToBlob(canvas, "image/png", 1);
      const file = blobToFile(blob, primaryFile, "png");
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
        title="WebP to PNG Converter – Convert WebP Images to PNG"
        description="Convert WebP images back to widely-supported PNG format in your browser. No upload, no quality loss, perfect for editing and compatibility."
        path="/tools/webp-to-png"
        keywords={[
          "webp to png",
          "convert webp",
          "webp converter",
          "download png from webp",
        ]}
      />
      <ToolLayout
        title="WebP to PNG Converter"
        intro="Turn any WebP image into a PNG file that works everywhere. Ideal for editing, legacy software or platforms that do not yet support WebP."
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
                  This tool decodes your WebP image and re-encodes it as PNG locally.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] text-slate-400 hover:text-brand-300"
                >
                  Remove image
                </button>
              </div>
              <button
                type="button"
                onClick={handleConvert}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Converting…" : "Convert to PNG"}
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
            How to convert WebP to PNG
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your WebP image into the upload area.</li>
            <li>Click &ldquo;Convert to PNG&rdquo;.</li>
            <li>Wait for the conversion to complete in your browser.</li>
            <li>Preview and download your new PNG image.</li>
          </ol>
          <section className="space-y-3 mt-4">
            <h2 className="text-lg font-semibold text-slate-50">
              WebP to PNG FAQ
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h3 className="font-medium text-slate-100">
                  Why convert WebP images to PNG?
                </h3>
                <p>
                  Some image editors and platforms still do not support WebP. Converting
                  to PNG ensures broad compatibility and preserves transparency.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Is the conversion lossless?
                </h3>
                <p>
                  The tool decodes WebP and encodes PNG at full quality. While formats
                  differ, for most use cases the result is visually lossless.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Are my WebP files uploaded?
                </h3>
                <p>
                  No. Everything happens locally in your browser, so your images remain
                  on your device.
                </p>
              </div>
            </div>
          </section>
        </section>
      </ToolLayout>
    </>
  );
}

