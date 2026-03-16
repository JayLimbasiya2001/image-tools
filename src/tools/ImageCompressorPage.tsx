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

export default function ImageCompressorPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);
  const [quality, setQuality] = useState(0.7);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = useState(1920);
  const [processing, setProcessing] = useState(false);
  const [resultFile, setResultFile] = useState<File | null>(null);

  const handleCompress = async () => {
    if (!primaryFile) return;
    setProcessing(true);
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight,
        initialQuality: quality,
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
        title="Online Image Compressor – Compress Images in Your Browser"
        description="Compress images online with Pixeloop Tools. Reduce image file size without noticeable quality loss. All compression runs locally in your browser for maximum privacy."
        path="/tools/image-compressor"
        keywords={[
          "online image compressor",
          "compress images in browser",
          "reduce image file size",
          "lossless image compression",
        ]}
      />
      <ToolLayout
        title="Online Image Compressor"
        intro="Compress JPG, PNG or WebP images in your browser. Reduce file size for faster websites, smaller emails and quicker sharing—without uploading files to a server."
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
                    Original size:{" "}
                    <span className="font-medium">{formatBytes(primaryFile.size)}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Adjust quality or max dimensions, then click Compress image.
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
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs text-slate-300">
                    Compression quality
                    <span className="text-[11px] text-slate-400">
                      {(quality * 100).toFixed(0)}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0.2}
                    max={0.95}
                    step={0.05}
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs text-slate-300">
                    Max width or height (px)
                    <span className="text-[11px] text-slate-400">
                      {maxWidthOrHeight}px
                    </span>
                  </label>
                  <input
                    type="range"
                    min={600}
                    max={3840}
                    step={80}
                    value={maxWidthOrHeight}
                    onChange={(e) =>
                      setMaxWidthOrHeight(parseInt(e.target.value, 10))
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleCompress}
                disabled={processing}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {processing ? "Compressing…" : "Compress image"}
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
            How to compress an image online
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drag and drop your JPG, PNG or WebP file into the upload area.</li>
            <li>
              Adjust the compression quality and maximum width or height for your image.
            </li>
            <li>Click &ldquo;Compress image&rdquo; and wait a moment.</li>
            <li>Preview the result and download the optimized image file.</li>
          </ol>
          <section className="space-y-3 mt-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Image compression FAQ
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h3 className="font-medium text-slate-100">
                  What is image compression?
                </h3>
                <p className="text-sm text-slate-300">
                  Image compression reduces the file size of an image by removing
                  unnecessary data. This makes images faster to load on websites and
                  easier to share, while keeping visual quality as high as possible.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Is this image compressor free?
                </h3>
                <p className="text-sm text-slate-300">
                  Yes. Pixeloop Tools is completely free to use. There are no watermarks,
                  no sign-ups and no usage limits for typical personal use.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Is my image secure when I use this tool?
                </h3>
                <p className="text-sm text-slate-300">
                  Your images never leave your browser. All compression is performed
                  locally using JavaScript and the HTML5 canvas API, which means we never
                  receive or store your files.
                </p>
              </div>
            </div>
          </section>
        </section>
      </ToolLayout>
    </>
  );
}

