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

export default function ImageMetadataRemoverPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleStrip = async () => {
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
      const type =
        (primaryFile.type as "image/jpeg" | "image/png" | "image/webp") ||
        "image/jpeg";
      const blob = await canvasToBlob(canvas, type, 0.92);
      const ext =
        type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
      const file = blobToFile(blob, primaryFile, `clean-${ext}`);
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
        title="Image Metadata Remover – Strip EXIF Data"
        description="Remove EXIF metadata like location, camera model and timestamps from photos. All stripping happens locally in your browser."
        path="/tools/image-metadata-remover"
        keywords={[
          "remove image metadata",
          "strip exif data",
          "remove photo location",
          "privacy image tool",
        ]}
      />
      <ToolLayout
        title="Image Metadata Remover"
        intro="Strip EXIF metadata like GPS location, camera model and timestamps from images for improved privacy before sharing."
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
                  This tool re-encodes your image without metadata using the HTML5 canvas.
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
                onClick={handleStrip}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Removing metadata…" : "Remove metadata"}
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
            How to remove image metadata
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your photo into the upload area.</li>
            <li>Click &ldquo;Remove metadata&rdquo;.</li>
            <li>Wait for the clean version to be generated.</li>
            <li>Download and share the privacy-safe image.</li>
          </ol>
          <section className="space-y-3 mt-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Metadata remover FAQ
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h3 className="font-medium text-slate-100">
                  What is EXIF metadata?
                </h3>
                <p>
                  EXIF metadata includes details like camera model, GPS coordinates,
                  timestamps and exposure settings that are stored inside image files.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Why remove metadata from images?
                </h3>
                <p>
                  Removing metadata protects your privacy by stripping hidden location
                  data and other context before sharing photos online.
                </p>
              </div>
            </div>
          </section>
        </section>
      </ToolLayout>
    </>
  );
}

