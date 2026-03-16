import { Helmet } from "react-helmet-async";
import { siteBaseUrl } from "./seoConfig";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function Seo({ title, description, path, keywords }: SeoProps) {
  const url = `${siteBaseUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  );
}

