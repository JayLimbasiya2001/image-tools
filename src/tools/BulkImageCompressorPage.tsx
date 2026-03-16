import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Seo } from "../seo/Seo";
import { ToolLayout } from "../components/layout/ToolLayout";
import { ImageDropzone } from "../components/image/ImageDropzone";
import { useImageFile } from "../hooks/useImageFile";
import { AdSlot } from "../components/layout/AdSlot";
import { formatBytes } from "../utils/fileUtils";

interface ResultItem {
  original: File;
  compressed: File | null;
  progress: number;
}

export default function BulkImageCompressorPage() {
  const { files, onFiles, error, clear } = useImageFile(true);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [running, setRunning] = useState(false);
  const [quality, setQuality] = useState(0.7);

  const handleCompressAll = async () => {
    if (!files.length) return;
    setRunning(true);
    const initial: ResultItem[] = files.map((f) => ({
      original: f,
      compressed: null,
      progress: 0,
    }));
    setResults(initial);

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      try {
        const options = {
          maxSizeMB: 2,
          initialQuality: quality,
          useWebWorker: true,
          onProgress: (p: number) => {
            setResults((prev) =>
              prev.map((r, idx) =>
                idx === i ? { ...r, progress: p } : r
              )
            );
          },
        };
        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type,
        });
        setResults((prev) =>
          prev.map((r, idx) =>
            idx === i ? { ...r, compressed: compressedFile, progress: 100 } : r
          )
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    setRunning(false);
  };

  return (
    <>
      <Seo
        title="Bulk Image Compressor – Compress Multiple Images Online"
        description="Compress multiple images at once directly in your browser. Drop a batch of JPG, PNG or WebP files and download optimized versions."
        path="/tools/bulk-image-compressor"
        keywords={[
          "bulk image compressor",
          "compress multiple images",
          "batch image compression",
        ]}
      />
      <ToolLayout
        title="Bulk Image Compressor"
        intro="Compress many images at once without uploading them anywhere. Perfect for preparing site assets, blog posts or photo albums."
      >
        <div className="space-y-4">
          <ImageDropzone onFiles={onFiles} multiple />
          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {files.length > 0 && (
            <div className="glass-panel p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-300">
                  {files.length} image{files.length > 1 ? "s" : ""} selected. Compression
                  runs one file at a time to keep the browser responsive.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    setResults([]);
                  }}
                  className="text-[11px] text-slate-400 hover:text-brand-300"
                >
                  Clear files
                </button>
              </div>
              <div className="space-y-2 max-w-xs">
                <label className="flex items-center justify-between text-xs text-slate-300">
                  Compression quality
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
                onClick={handleCompressAll}
                disabled={running}
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
              >
                {running ? "Compressing batch…" : "Compress all images"}
              </button>
            </div>
          )}
          {results.length > 0 && (
            <div className="glass-panel p-4 space-y-3">
              <h2 className="text-sm font-semibold text-slate-100">
                Compression results
              </h2>
              <div className="max-h-64 overflow-auto text-xs text-slate-300 space-y-2">
                {results.map((r) => {
                  const url = r.compressed
                    ? URL.createObjectURL(r.compressed)
                    : null;
                  return (
                    <div
                      key={r.original.name}
                      className="flex items-center justify-between gap-3 border-b border-slate-800/70 pb-2 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-slate-100 truncate">
                          {r.original.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {formatBytes(r.original.size)}{" "}
                          {r.compressed &&
                            `→ ${formatBytes(r.compressed.size)}`}
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-brand-500 transition-all"
                            style={{ width: `${r.progress}%` }}
                          />
                        </div>
                      </div>
                      {url && (
                        <a
                          href={url}
                          download={r.compressed?.name}
                          className="text-[11px] text-brand-300 hover:text-brand-200 whitespace-nowrap"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <AdSlot position="inline" />
        </div>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-50">
            How to bulk compress images
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Select or drag and drop all the images you want to compress.</li>
            <li>Adjust the compression quality slider.</li>
            <li>Click &ldquo;Compress all images&rdquo;.</li>
            <li>Download each optimized file from the results list.</li>
          </ol>
        </section>
      </ToolLayout>
    </>
  );
}

