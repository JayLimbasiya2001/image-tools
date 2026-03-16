import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";
import {
  defaultOgImagePath,
  defaultSeo,
  siteBaseUrl,
  siteName,
} from "./seoConfig";

export function SeoProvider({ children }: PropsWithChildren) {
  const ogImageUrl = `${siteBaseUrl}${defaultOgImagePath}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
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
        defaultTitle={`${siteName} – Free Online Image Tools`}
        titleTemplate={`%s – ${siteName}`}
      >
        <meta name="description" content={defaultSeo.description} />
        <meta name="keywords" content={defaultSeo.keywords?.join(", ")} />
        <link rel="canonical" href={`${siteBaseUrl}${defaultSeo.path}`} />
        <meta property="og:title" content={defaultSeo.title} />
        <meta property="og:description" content={defaultSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteBaseUrl}${defaultSeo.path}`} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content={`${siteName} – Free Online Image Tools`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={defaultSeo.title} />
        <meta property="twitter:description" content={defaultSeo.description} />
        <meta property="twitter:image" content={ogImageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      {children}
    </>
  );
}

