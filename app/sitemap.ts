import { MetadataRoute } from "next";
import { AvailableDocuments } from "@/lib/types";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  // CORRECTION: Nouveau domaine
  const baseUrl = "https://document-pro.fr";

  const documentRoutes = AvailableDocuments.map((doc) => ({
    url: `${baseUrl}/generate/${slugify(doc.name)}-${doc.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    ...documentRoutes,
  ];
}
