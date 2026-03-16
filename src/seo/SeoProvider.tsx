import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";
import { defaultSeo, siteBaseUrl } from "./seoConfig";

export function SeoProvider({ children }: PropsWithChildren) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pixeloop Tools",
    description: defaultSeo.description,
    applicationCategory: "Photo & Video",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: siteBaseUrl,
  };

  return (
    <>
      <Helmet
        defaultTitle="Pixeloop Tools – Free Online Image Tools"
        titleTemplate="%s – Pixeloop Tools"
      >
        <meta name="description" content={defaultSeo.description} />
        <meta name="keywords" content={defaultSeo.keywords?.join(", ")} />
        <link rel="canonical" href={`${siteBaseUrl}${defaultSeo.path}`} />
        <meta property="og:title" content={defaultSeo.title} />
        <meta property="og:description" content={defaultSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteBaseUrl}${defaultSeo.path}`} />
        <meta property="og:site_name" content="Pixeloop Tools" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={defaultSeo.title} />
        <meta property="twitter:description" content={defaultSeo.description} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      {children}
    </>
  );
}

