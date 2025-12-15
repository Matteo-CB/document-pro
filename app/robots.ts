import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    // CORRECTION: Nouveau domaine
    sitemap: "https://document-pro.fr/sitemap.xml",
  };
}
