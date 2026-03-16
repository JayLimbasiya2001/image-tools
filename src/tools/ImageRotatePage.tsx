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

export default function ImageRotatePage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [degrees, setDegrees] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleRotate = async () => {
    if (!primaryFile) return;
    setProcessing(true);
    try {
      const image = await loadImageFromFile(primaryFile);
      const canvas = drawToCanvas(
        image,
        image.naturalWidth,
        image.naturalHeight,
        degrees
      );
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
        title="Image Rotate Tool – Rotate Photos Online"
        description="Rotate images by 90, 180 or 270 degrees in your browser. Fix sideways photos without uploading them to a server."
        path="/tools/image-rotate"
        keywords={[
          "rotate image",
          "rotate photo online",
          "fix sideways images",
          "image rotator",
        ]}
      />
      <ToolLayout
        title="Image Rotate Tool"
        intro="Fix sideways or upside-down images by rotating them to the correct orientation. All rotation happens locally in your browser."
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
                  Choose a rotation angle and apply it to your image.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] text-slate-400 hover:text-brand-300"
                >
                  Remove image
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <div className="flex gap-2">
                  {[90, 180, 270].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDegrees(d)}
                      className={`rounded-full px-3 py-1 border ${
                        degrees === d
                          ? "border-brand-500 bg-brand-600/40 text-brand-100"
                          : "border-slate-700 bg-slate-900 text-slate-200"
                      }`}
                    >
                      {d}°
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 ml-2">
                  <span>Custom:</span>
                  <input
                    type="number"
                    min={-180}
                    max={180}
                    value={degrees}
                    onChange={(e) =>
                      setDegrees(Math.max(-180, Math.min(180, Number(e.target.value))))
                    }
                    className="w-16 rounded-lg border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50 outline-none focus:border-brand-500"
                  />
                  <span>deg</span>
                </label>
              </div>
              <button
                type="button"
                onClick={handleRotate}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Rotating…" : "Rotate image"}
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
            How to rotate an image online
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your image into the upload area.</li>
            <li>Select a preset rotation (90°, 180°, 270°) or enter a custom angle.</li>
            <li>Click &ldquo;Rotate image&rdquo;.</li>
            <li>Preview and download the corrected image.</li>
          </ol>
        </section>
      </ToolLayout>
    </>
  );
}

