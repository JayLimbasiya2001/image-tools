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
  const gaId = import.meta.env.VITE_GA_ID as string | undefined;
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteBaseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteBaseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
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
        <meta name="robots" content="index,follow" />
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
        {gaId && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        )}
        {gaId && (
          <script type="text/javascript">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
          </script>
        )}
        <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      {children}
    </>
  );
}

