interface ResultActionsProps {
  file?: File | null;
  processing: boolean;
}

export function ResultActions({ file, processing }: ResultActionsProps) {
  if (!file) return null;
  const url = URL.createObjectURL(file);

  return (
    <div className="glass-panel p-4 flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="text-xs text-slate-300">
        {processing
          ? "Processing image…"
          : "Your image is ready. Download the optimized file."}
      </div>
      <a
        href={url}
        download={file.name}
        className="inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-brand-500 transition disabled:opacity-60"
      >
        Download image
      </a>
    </div>
  );
}

