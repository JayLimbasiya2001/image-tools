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

type Format = "image/jpeg" | "image/png" | "image/webp";

export default function ImageFormatConverterPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [targetFormat, setTargetFormat] = useState<Format>("image/jpeg");
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleConvert = async () => {
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
      const blob = await canvasToBlob(canvas, targetFormat, 0.9);
      const ext =
        targetFormat === "image/png"
          ? "png"
          : targetFormat === "image/webp"
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
        title="Image Format Converter – JPG, PNG, WebP"
        description="Convert images between JPG, PNG and WebP formats directly in your browser. No uploads and no quality loss for typical use."
        path="/tools/image-format-converter"
        keywords={[
          "image format converter",
          "jpg to png",
          "png to webp",
          "jpg to webp",
        ]}
      />
      <ToolLayout
        title="Image Format Converter"
        intro="Convert images between JPG, PNG and WebP formats in a single click. All conversion runs locally in your browser."
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
                  Choose the output format you need for web, apps or editing.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] text-slate-400 hover:text-brand-300"
                >
                  Remove image
                </button>
              </div>
              <div className="space-y-2 max-w-xs text-xs text-slate-300">
                <label className="flex flex-col gap-1">
                  <span>Target format</span>
                  <select
                    value={targetFormat}
                    onChange={(e) =>
                      setTargetFormat(e.target.value as Format)
                    }
                    className="rounded-lg border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-50 outline-none focus:border-brand-500"
                  >
                    <option value="image/jpeg">JPG (JPEG)</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </label>
              </div>
              <button
                type="button"
                onClick={handleConvert}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Converting…" : "Convert format"}
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
            How to convert between JPG, PNG and WebP
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your image into the upload area.</li>
            <li>Select the output format: JPG, PNG or WebP.</li>
            <li>Click &ldquo;Convert format&rdquo;.</li>
            <li>Preview and download the converted file.</li>
          </ol>
        </section>
      </ToolLayout>
    </>
  );
}

