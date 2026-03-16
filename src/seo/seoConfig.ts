export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export const siteBaseUrl = "https://pixeloop.tools";

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

