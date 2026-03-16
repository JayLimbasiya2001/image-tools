import { Helmet } from "react-helmet-async";
import { defaultOgImagePath, siteBaseUrl, siteName } from "./seoConfig";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imagePath?: string;
}

export function Seo({ title, description, path, keywords, imagePath }: SeoProps) {
  const url = `${siteBaseUrl}${path}`;
  const imageUrl = `${siteBaseUrl}${imagePath ?? defaultOgImagePath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

