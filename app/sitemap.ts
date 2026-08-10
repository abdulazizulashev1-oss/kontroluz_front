import { MetadataRoute } from "next";
import { fetchCategories, fetchProducts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kontrol.uz";

  const categories = await fetchCategories();
  const products = await fetchProducts();

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/katalog?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((prod) => ({
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
    {
      url: `${baseUrl}/kontaktlar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...categoryRoutes,
    ...productRoutes,
  ];
}
