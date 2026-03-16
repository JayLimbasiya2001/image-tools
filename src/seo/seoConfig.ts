export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export const siteBaseUrl =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://image-tools-sandy-alpha.vercel.app";

export const siteName = "Pixeloop Tools";
export const defaultOgImagePath = "/og-image.svg";

export const defaultSeo: SeoConfig = {
  title: "Free Online Image Tools – Compress, Resize, Convert in Your Browser",
  description:
    "Pixeloop Tools is a free online toolkit to compress, resize, crop, rotate and convert images entirely in your browser. No uploads, no watermark, privacy-friendly.",
  path: "/",
  keywords: [
    "image compressor",
    "image resizer",
    "image crop",
    "image converter",
    "webp converter",
  ],
};

