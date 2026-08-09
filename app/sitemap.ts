import { MetadataRoute } from "next";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kontrol.uz";

  const categoryRoutes = MOCK_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/katalog?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = MOCK_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/katalog/${prod.categorySlug}/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/katalog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryRoutes,
    ...productRoutes,
  ];
}
