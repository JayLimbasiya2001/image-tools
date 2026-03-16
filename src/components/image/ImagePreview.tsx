import { formatBytes } from "../../utils/fileUtils";

interface ImagePreviewProps {
  file: File;
  processedFile?: File | null;
}

export function ImagePreview({ file, processedFile }: ImagePreviewProps) {
  const originalUrl = URL.createObjectURL(file);
  const processedUrl = processedFile ? URL.createObjectURL(processedFile) : null;

  return (
    <div className="glass-panel p-4 space-y-4">
      <h2 className="text-sm font-semibold text-slate-100">
        Preview &amp; file details
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <figure className="space-y-2">
          <figcaption className="text-xs text-slate-400">Original</figcaption>
          <img
            src={originalUrl}
            alt={file.name}
            className="w-full max-h-64 object-contain rounded-lg bg-slate-900"
            loading="lazy"
          />
          <p className="text-[11px] text-slate-400">
            {file.name} · {formatBytes(file.size)}
          </p>
        </figure>
        {processedUrl && processedFile && (
          <figure className="space-y-2">
            <figcaption className="text-xs text-slate-400">
              Processed result
            </figcaption>
            <img
              src={processedUrl}
              alt={processedFile.name}
              className="w-full max-h-64 object-contain rounded-lg bg-slate-900"
              loading="lazy"
            />
            <p className="text-[11px] text-slate-400">
              {processedFile.name} · {formatBytes(processedFile.size)}
            </p>
          </figure>
        )}
      </div>
    </div>
  );
}

