import { lazy } from "react";

export interface ToolRoute {
  path: string;
  name: string;
  shortDescription: string;
  keywords: string[];
  Component: React.LazyExoticComponent<() => JSX.Element>;
}

export const toolRoutes: ToolRoute[] = [
  {
    path: "/tools/image-compressor",
    name: "Image Compressor",
    shortDescription: "Compress images in your browser without quality loss.",
    keywords: ["image compressor", "compress images online", "reduce image size"],
    Component: lazy(() => import("./tools/ImageCompressorPage")),
  },
  {
    path: "/tools/image-size-reducer",
    name: "Image Size Reducer",
    shortDescription: "Shrink file size for faster sharing and uploads.",
    keywords: ["image size reducer", "shrink image", "reduce file size"],
    Component: lazy(() => import("./tools/ImageSizeReducerPage")),
  },
  {
    path: "/tools/image-to-webp",
    name: "Image to WebP Converter",
    shortDescription: "Convert PNG or JPG images to modern WebP format.",
    keywords: ["image to webp", "convert jpg to webp", "convert png to webp"],
    Component: lazy(() => import("./tools/ImageToWebPPage")),
  },
  {
    path: "/tools/webp-to-png",
    name: "WebP to PNG Converter",
    shortDescription: "Convert WebP images back to widely-supported PNG.",
    keywords: ["webp to png", "convert webp", "download png from webp"],
    Component: lazy(() => import("./tools/WebPToPngPage")),
  },
  {
    path: "/tools/image-resizer",
    name: "Image Resizer",
    shortDescription: "Resize an image to exact width and height.",
    keywords: ["image resizer", "resize image online", "change image dimensions"],
    Component: lazy(() => import("./tools/ImageResizerPage")),
  },
  {
    path: "/tools/image-crop",
    name: "Image Crop Tool",
    shortDescription: "Crop images to focus on what matters.",
    keywords: ["crop image", "image cropper", "online crop tool"],
    Component: lazy(() => import("./tools/ImageCropPage")),
  },
  {
    path: "/tools/image-rotate",
    name: "Image Rotate Tool",
    shortDescription: "Rotate images by 90, 180, 270 degrees or custom.",
    keywords: ["rotate image", "image rotator", "fix sideways photos"],
    Component: lazy(() => import("./tools/ImageRotatePage")),
  },
  {
    path: "/tools/image-format-converter",
    name: "Image Format Converter",
    shortDescription: "Convert between JPG, PNG, and WebP formats.",
    keywords: ["image format converter", "jpg to png", "png to webp"],
    Component: lazy(() => import("./tools/ImageFormatConverterPage")),
  },
  {
    path: "/tools/image-quality-reducer",
    name: "Image Quality Reducer",
    shortDescription: "Lower quality to dramatically reduce image size.",
    keywords: ["image quality reducer", "reduce quality", "jpeg quality"],
    Component: lazy(() => import("./tools/ImageQualityReducerPage")),
  },
  {
    path: "/tools/bulk-image-compressor",
    name: "Bulk Image Compressor",
    shortDescription: "Compress many images at once in your browser.",
    keywords: ["bulk image compressor", "compress multiple images", "batch compressor"],
    Component: lazy(() => import("./tools/BulkImageCompressorPage")),
  },
  {
    path: "/tools/image-metadata-remover",
    name: "Image Metadata Remover",
    shortDescription: "Strip EXIF metadata for privacy friendly images.",
    keywords: ["remove image metadata", "strip exif", "privacy images"],
    Component: lazy(() => import("./tools/ImageMetadataRemoverPage")),
  },
  {
    path: "/tools/image-preview-download",
    name: "Image Preview & Download",
    shortDescription: "Quickly preview images and download processed results.",
    keywords: ["image preview", "download image", "view image online"],
    Component: lazy(() => import("./tools/ImagePreviewDownloadPage")),
  },
];

export const routes = toolRoutes;

