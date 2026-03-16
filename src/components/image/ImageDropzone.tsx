import { ChangeEvent, DragEvent } from "react";

interface ImageDropzoneProps {
  onFiles: (files: FileList) => void;
  multiple?: boolean;
}

export function ImageDropzone({ onFiles, multiple }: ImageDropzoneProps) {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) onFiles(event.target.files);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files?.length) {
      onFiles(event.dataTransfer.files);
    }
  };

  const prevent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={prevent}
      onDragEnter={prevent}
      onDragLeave={prevent}
      className="glass-panel flex flex-col items-center justify-center gap-3 px-4 py-8 text-center border-dashed border-2 border-slate-700/80 hover:border-brand-500/80 transition-colors"
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-brand-300">
        ⬆
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-50">
          Drag &amp; drop images here
        </p>
        <p className="text-xs text-slate-400">
          or click to browse JPG, PNG, WebP files
        </p>
      </div>
      <label className="mt-2 inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-brand-500 transition">
        Choose file{multiple ? "s" : ""}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={handleInput}
        />
      </label>
    </div>
  );
}

