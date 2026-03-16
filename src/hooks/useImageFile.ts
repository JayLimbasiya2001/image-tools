import { useState } from "react";

export function useImageFile(multiple = false) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onFiles = (list: FileList) => {
    const accepted: File[] = [];
    for (let i = 0; i < list.length; i += 1) {
      const file = list[i];
      if (!file.type.startsWith("image/")) {
        setError("Only image files are supported.");
        continue;
      }
      accepted.push(file);
    }
    if (!accepted.length) return;
    setError(null);
    setFiles(multiple ? accepted : [accepted[0]]);
  };

  const clear = () => {
    setFiles([]);
    setError(null);
  };

  return { files, primaryFile: files[0] ?? null, error, onFiles, clear };
}

