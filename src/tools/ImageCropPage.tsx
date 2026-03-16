import { useState } from "react";
import { Seo } from "../seo/Seo";
import { ToolLayout } from "../components/layout/ToolLayout";
import { ImageDropzone } from "../components/image/ImageDropzone";
import { useImageFile } from "../hooks/useImageFile";
import { ImagePreview } from "../components/image/ImagePreview";
import { ResultActions } from "../components/image/ResultActions";
import { AdSlot } from "../components/layout/AdSlot";
import { canvasToBlob, loadImageFromFile } from "../utils/canvasUtils";
import { blobToFile } from "../utils/fileUtils";

export default function ImageCropPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [cropWidth, setCropWidth] = useState<number | "">("");
  const [cropHeight, setCropHeight] = useState<number | "">("");
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);

  const handleInit = async () => {
    if (!primaryFile) return;
    const img = await loadImageFromFile(primaryFile);
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    setDimensions({ w, h });
    const size = Math.min(w, h);
    setCropWidth(size);
    setCropHeight(size);
  };

  if (primaryFile && !dimensions) {
    void handleInit();
  }

  const parse = (value: string) => {
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? "" : n;
  };

  const handleCrop = async () => {
    if (!primaryFile || !dimensions) return;
    if (typeof cropWidth !== "number" || typeof cropHeight !== "number") return;
    setProcessing(true);
    try {
      const img = await loadImageFromFile(primaryFile);
      const { w, h } = dimensions;
      const cw = Math.min(cropWidth, w);
      const ch = Math.min(cropHeight, h);
      const startX = (w - cw) / 2;
      const startY = (h - ch) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");
      ctx.drawImage(img, startX, startY, cw, ch, 0, 0, cw, ch);

      const type =
        (primaryFile.type as "image/jpeg" | "image/png" | "image/webp") ||
        "image/jpeg";
      const blob = await canvasToBlob(canvas, type, 0.95);
      const ext =
        type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
      const file = blobToFile(blob, primaryFile, `crop-${ext}`);
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
        title="Image Crop Tool – Crop Images Online"
        description="Crop images to focus on what matters. Use a simple center crop with custom width and height, processed entirely in your browser."
        path="/tools/image-crop"
        keywords={[
          "crop image online",
          "image cropper",
          "center crop photo",
          "online image crop tool",
        ]}
      />
      <ToolLayout
        title="Image Crop Tool"
        intro="Quickly crop images to a custom size. This tool applies a center crop based on the width and height you choose."
      >
        <div className="space-y-4">
          <ImageDropzone onFiles={onFiles} multiple={false} />
          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {primaryFile && dimensions && (
            <div className="glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-300">
                  Original: {dimensions.w} × {dimensions.h} px. Enter the crop size; the
                  tool will crop from the center.
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
                  <span>Crop width (px)</span>
                  <input
                    type="number"
                    min={16}
                    max={dimensions.w}
                    value={cropWidth}
                    onChange={(e) => setCropWidth(parse(e.target.value))}
                    className="w-28 rounded-lg border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50 outline-none focus:border-brand-500"
                  />
                </label>
                <span className="mt-5 text-slate-500">×</span>
                <label className="space-y-1">
                  <span>Crop height (px)</span>
                  <input
                    type="number"
                    min={16}
                    max={dimensions.h}
                    value={cropHeight}
                    onChange={(e) => setCropHeight(parse(e.target.value))}
                    className="w-28 rounded-lg border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50 outline-none focus:border-brand-500"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={handleCrop}
                disabled={
                  processing ||
                  typeof cropWidth !== "number" ||
                  typeof cropHeight !== "number"
                }
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Cropping…" : "Crop image"}
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
            How to crop an image online
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your image into the upload area.</li>
            <li>Enter the crop width and height in pixels.</li>
            <li>Click &ldquo;Crop image&rdquo; to apply a center crop.</li>
            <li>Preview and download the cropped image.</li>
          </ol>
        </section>
      </ToolLayout>
    </>
  );
}

