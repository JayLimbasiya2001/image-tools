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

export default function ImageResizerPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [lockRatio, setLockRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleFileReady = async () => {
    if (!primaryFile) return;
    const img = await loadImageFromFile(primaryFile);
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    setOriginalRatio(w / h);
    setWidth(w);
    setHeight(h);
  };

  if (primaryFile && originalRatio === null) {
    void handleFileReady();
  }

  const parse = (value: string) => {
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? "" : n;
  };

  const onWidthChange = (v: string) => {
    const w = parse(v);
    if (w === "") {
      setWidth("");
      return;
    }
    setWidth(w);
    if (lockRatio && originalRatio) {
      setHeight(Math.round(w / originalRatio));
    }
  };

  const onHeightChange = (v: string) => {
    const h = parse(v);
    if (h === "") {
      setHeight("");
      return;
    }
    setHeight(h);
    if (lockRatio && originalRatio) {
      setWidth(Math.round(h * originalRatio));
    }
  };

  const handleResize = async () => {
    if (!primaryFile || typeof width !== "number" || typeof height !== "number") return;
    setProcessing(true);
    try {
      const img = await loadImageFromFile(primaryFile);
      const canvas = drawToCanvas(img, width, height, 0);
      const blob = await canvasToBlob(
        canvas,
        (primaryFile.type as "image/jpeg" | "image/png" | "image/webp") || "image/jpeg"
      );
      const ext =
        primaryFile.type === "image/png"
          ? "png"
          : primaryFile.type === "image/webp"
          ? "webp"
          : "jpg";
      const file = blobToFile(blob, primaryFile, ext);
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
        title="Image Resizer – Resize Images to Exact Dimensions"
        description="Resize images to specific width and height in your browser. Keep aspect ratio locked or unlock it to fit exact dimensions."
        path="/tools/image-resizer"
        keywords={[
          "image resizer",
          "resize image online",
          "change image dimensions",
          "resize photo",
        ]}
      />
      <ToolLayout
        title="Image Resizer"
        intro="Resize images to precise dimensions for web, social media or app assets. Keep aspect ratio locked or set custom width and height."
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
                  Set the target width and height in pixels. Lock aspect ratio to avoid
                  stretching.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] text-slate-400 hover:text-brand-300"
                >
                  Remove image
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <label className="space-y-1">
                  <span>Width (px)</span>
                  <input
                    type="number"
                    min={16}
                    max={8000}
                    value={width}
                    onChange={(e) => onWidthChange(e.target.value)}
                    className="w-28 rounded-lg border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50 outline-none focus:border-brand-500"
                  />
                </label>
                <span className="mt-5 text-slate-500">×</span>
                <label className="space-y-1">
                  <span>Height (px)</span>
                  <input
                    type="number"
                    min={16}
                    max={8000}
                    value={height}
                    onChange={(e) => onHeightChange(e.target.value)}
                    className="w-28 rounded-lg border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50 outline-none focus:border-brand-500"
                  />
                </label>
                <label className="flex items-center gap-2 mt-5">
                  <input
                    type="checkbox"
                    checked={lockRatio}
                    onChange={(e) => setLockRatio(e.target.checked)}
                    className="h-3 w-3 rounded border-slate-600 bg-slate-900"
                  />
                  <span className="text-[11px] text-slate-300">Lock aspect ratio</span>
                </label>
              </div>
              <button
                type="button"
                onClick={handleResize}
                disabled={processing || typeof width !== "number" || typeof height !== "number"}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Resizing…" : "Resize image"}
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
            How to resize an image
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your image into the upload area.</li>
            <li>Enter the desired width and height in pixels.</li>
            <li>Choose whether to keep the aspect ratio locked.</li>
            <li>Click &ldquo;Resize image&rdquo; and download the new file.</li>
          </ol>
        </section>
      </ToolLayout>
    </>
  );
}

