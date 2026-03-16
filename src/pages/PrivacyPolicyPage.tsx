import { Seo } from "../seo/Seo";

export function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy – Pixeloop Tools"
        description="Read how Pixeloop Tools handles your data. All image processing is done locally in your browser; images are never uploaded to a server."
        path="/privacy-policy"
      />
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          Pixeloop Tools is designed to be privacy-first. All image compression,
          resizing, conversion and editing happens directly in your browser using local
          JavaScript APIs. Your images are never uploaded to our servers.
        </p>
        <h2 className="text-xl font-semibold text-slate-50 mt-4">
          Image processing
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          When you drag and drop files into Pixeloop Tools, they are loaded into memory
          in your browser only. We do not transmit or store your files on any remote
          server. When you close the tab, your files and any temporary data are cleared
          by your browser.
        </p>
        <h2 className="text-xl font-semibold text-slate-50 mt-4">
          Analytics &amp; cookies
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          This starter version does not include analytics or tracking cookies. If you add
          third-party analytics or ad scripts in the future, please update this section to
          describe what data is collected and why.
        </p>
        <h2 className="text-xl font-semibold text-slate-50 mt-4">
          Contact
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          If you have questions about this privacy policy you can reach out via the
          contact form on the Contact page.
        </p>
      </section>
    </>
  );
}

