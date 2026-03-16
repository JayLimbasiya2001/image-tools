export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(1)} ${sizes[i]}`;
}

export function blobToFile(blob: Blob, original: File, suffix: string): File {
  const parts = original.name.split(".");
  const ext = suffix.replace(".", "");
  const base = parts.slice(0, -1).join(".") || parts[0];
  const name = `${base}-${ext}.${ext}`;
  return new File([blob], name, { type: blob.type });
}

