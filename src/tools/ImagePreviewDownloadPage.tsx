import { Seo } from "../seo/Seo";
import { ToolLayout } from "../components/layout/ToolLayout";
import { ImageDropzone } from "../components/image/ImageDropzone";
import { useImageFile } from "../hooks/useImageFile";
import { ImagePreview } from "../components/image/ImagePreview";
import { ResultActions } from "../components/image/ResultActions";
import { AdSlot } from "../components/layout/AdSlot";

export default function ImagePreviewDownloadPage() {
  const { primaryFile, onFiles, error, clear } = useImageFile(false);

  return (
    <>
      <Seo
        title="Image Preview & Download – View Images Online"
        description="Quickly preview images in your browser and download them without quality loss. Ideal for checking optimized files from other tools."
        path="/tools/image-preview-download"
        keywords={[
          "image preview",
          "preview images online",
          "download image",
          "view photo in browser",
        ]}
      />
      <ToolLayout
        title="Image Preview & Download"
        intro="Drop any supported image to quickly preview it in your browser and download a clean copy. Ideal for checking optimized images from other Pixeloop tools."
      >
        <div className="space-y-4">
          <ImageDropzone onFiles={onFiles} multiple={false} />
          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {primaryFile && (
            <>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-300">
                  Use this tool to inspect files visually before publishing or sharing.
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[11px] text-slate-400 hover:text-brand-300"
                >
                  Remove image
                </button>
              </div>
              <ImagePreview file={primaryFile} processedFile={null} />
              <ResultActions file={primaryFile} processing={false} />
              <AdSlot position="inline" />
            </>
          )}
        </div>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-50">
            How to preview and download images
          </h2>
          <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
            <li>Drag and drop your image into the upload area.</li>
            <li>Review the preview to check quality, cropping and orientation.</li>
            <li>Use the download button to save a fresh copy to your device.</li>
          </ol>
          <section className="space-y-3 mt-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Image preview FAQ
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <h3 className="font-medium text-slate-100">
                  Does previewing change my image?
                </h3>
                <p>
                  No. This tool simply displays the image and offers a direct download of
                  the same file you uploaded.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-100">
                  Is my image stored or uploaded?
                </h3>
                <p>
                  No. The file is opened directly in your browser and never leaves your
                  device.
                </p>
              </div>
            </div>
          </section>
        </section>
      </ToolLayout>
    </>
  );
}

