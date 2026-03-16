import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Seo } from "../seo/Seo";
import { ToolLayout } from "../components/layout/ToolLayout";
import { ImageDropzone } from "../components/image/ImageDropzone";
import { useImageFile } from "../hooks/useImageFile";
import { ImagePreview } from "../components/image/ImagePreview";
import { ResultActions } from "../components/image/ResultActions";
import { AdSlot } from "../components/layout/AdSlot";
import { formatBytes } from "../utils/fileUtils";

export default function ImageSizeReducerPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [targetSizeMB, setTargetSizeMB] = useState(0.5);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleReduce = async () => {
    if (!primaryFile) return;
    setProcessing(true);
    try {
      const options = {
        maxSizeMB: targetSizeMB,
        useWebWorker: true,
      };
      const compressedBlob = await imageCompression(primaryFile, options);
      const file = new File([compressedBlob], primaryFile.name, {
        type: compressedBlob.type,
      });
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
        title="Image Size Reducer – Shrink Image File Size Online"
        description="Reduce image file size online with Pixeloop Tools. Target a specific maximum file size in MB while keeping acceptable quality. All processing stays in your browser."
        path="/tools/image-size-reducer"
        keywords={[
          "image size reducer",
          "shrink image size",
          "reduce image file size",
          "compress photo size",
        ]}
      />
      <ToolLayout
        title="Image Size Reducer"
        intro="Quickly shrink the file size of large photos and screenshots. Set a target maximum size in megabytes and let Pixeloop Tools compress your image in the browser."
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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-slate-300">
                    Current size:{" "}
                    <span className="font-medium">{formatBytes(primaryFile.size)}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Choose a smaller target size in MB. The tool will compress until your
                    image is under that limit where possible.
                  </p>
                </div>
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
                  Target max size (MB)
                  <span className="text-[11px] text-slate-400">
                    {targetSizeMB.toFixed(2)} MB
                  </span>
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={targetSizeMB}
                  onChange={(e) => setTargetSizeMB(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <button
                type="button"
                onClick={handleReduce}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Reducing size…" : "Reduce image size"}
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
            How to reduce image file size
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drop your photo or screenshot into the upload area.</li>
            <li>
              Use the slider to select a target maximum size in megabytes, like 0.5 MB or
              1 MB.
            </li>
            <li>Click &ldquo;Reduce image size&rdquo; and wait for processing.</li>
            <li>Download the new, smaller file and replace it where needed.</li>
          </ol>
          <section className="space-y-3 mt-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Image size reducer FAQ
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h3 className="font-medium text-slate-100">
                  Why reduce the file size of images?
                </h3>
                <p>
                  Smaller image files load faster on websites and apps, reduce bandwidth
                  usage and can help you stay within email or upload limits.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Does reducing size affect quality?
                </h3>
                <p>
                  To shrink file size, the tool lowers compression quality. For web use
                  and social sharing this is usually not noticeable, but you can always
                  compare the before and after previews.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Is my image sent to a server?
                </h3>
                <p>
                  No. All processing happens locally in your browser so your images stay
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

