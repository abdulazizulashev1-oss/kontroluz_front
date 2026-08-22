import { MetadataRoute } from "next";
import { fetchCategories, fetchProducts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kontrol.uz";
  const lastModified = new Date();

  // 1. Fetch dynamic categories and products
  let categories: any[] = [];
  let products: any[] = [];

  try {
    categories = await fetchCategories("all");
  } catch (err) {
    console.warn("Sitemap: fetchCategories failed, using fallback.");
  }

  try {
    products = await fetchProducts({ locale: "all" });
  } catch (err) {
    console.warn("Sitemap: fetchProducts failed, using fallback.");
  }

  // 2. Static Root Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/katalog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontaktlar`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 3. Category Routes (Deduplicated by slug)
  const categoryMap = new Map<string, MetadataRoute.Sitemap[number]>();

  categories.forEach((cat) => {
    if (cat.slug && !categoryMap.has(cat.slug)) {
      categoryMap.set(cat.slug, {
        url: `${baseUrl}/katalog?category=${encodeURIComponent(cat.slug)}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    if (Array.isArray(cat.subcategories)) {
      cat.subcategories.forEach((sub: any) => {
        if (sub.slug && !categoryMap.has(sub.slug)) {
          categoryMap.set(sub.slug, {
            url: `${baseUrl}/katalog?category=${encodeURIComponent(sub.slug)}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    }
  });

  const categoryRoutes = Array.from(categoryMap.values());

  // 4. Product Detail Routes (Deduplicated by slug)
  const productMap = new Map<string, MetadataRoute.Sitemap[number]>();

  products.forEach((prod) => {
    if (prod.slug && prod.categorySlug) {
      const key = `${prod.categorySlug}/${prod.slug}`;
      if (!productMap.has(key)) {
        productMap.set(key, {
          url: `${baseUrl}/katalog/${encodeURIComponent(prod.categorySlug)}/${encodeURIComponent(prod.slug)}`,
          lastModified,
          changeFrequency: "daily",
          priority: 0.9,
        });
      }
    }
  });

  const productRoutes = Array.from(productMap.values());

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
