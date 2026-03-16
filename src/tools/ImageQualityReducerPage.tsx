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

export default function ImageQualityReducerPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [quality, setQuality] = useState(0.6);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleReduce = async () => {
    if (!primaryFile) return;
    setProcessing(true);
    try {
      const image = await loadImageFromFile(primaryFile);
      const canvas = drawToCanvas(
        image,
        image.naturalWidth,
        image.naturalHeight,
        0
      );
      const blob = await canvasToBlob(canvas, "image/jpeg", quality);
      const file = blobToFile(blob, primaryFile, "quality");
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
        title="Image Quality Reducer – Lower JPEG Quality"
        description="Reduce JPEG quality to dramatically shrink image file size. Useful for thumbnails, previews and bandwidth-sensitive use cases."
        path="/tools/image-quality-reducer"
        keywords={[
          "image quality reducer",
          "reduce jpeg quality",
          "lower image quality",
          "reduce file size",
        ]}
      />
      <ToolLayout
        title="Image Quality Reducer"
        intro="Lower JPEG quality to aggressively reduce file size for thumbnails, previews and low-bandwidth scenarios."
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
                  Choose a lower JPEG quality to shrink your image size.
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
                  JPEG quality
                  <span className="text-[11px] text-slate-400">
                    {(quality * 100).toFixed(0)}%
                  </span>
                </label>
                <input
                  type="range"
                  min={0.2}
                  max={0.9}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                type="button"
                onClick={handleReduce}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Processing…" : "Reduce quality"}
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
            How to reduce image quality
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your image into the upload area.</li>
            <li>Use the slider to choose a lower quality percentage.</li>
            <li>Click &ldquo;Reduce quality&rdquo;.</li>
            <li>Compare the preview and download the smaller file.</li>
          </ol>
        </section>
      </ToolLayout>
    </>
  );
}

