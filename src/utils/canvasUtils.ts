export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function drawToCanvas(
  image: HTMLImageElement,
  width: number,
  height: number,
  rotateDegrees = 0
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const radians = (rotateDegrees * Math.PI) / 180;
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));
  const newWidth = width * cos + height * sin;
  const newHeight = width * sin + height * cos;

  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available.");

  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(image, -width / 2, -height / 2, width, height);

  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: "image/jpeg" | "image/png" | "image/webp",
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Failed to export canvas."));
        else resolve(blob);
      },
      type,
      quality
    );
  });
}

