export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  sku: string;
  categorySlug: string;
  categoryName: string;
  categoryRelationSlug?: string;
  price: number;
  oldPrice?: number;
  currency: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  videoUrl?: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  seo: SEOData;
  reviews?: Review[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  imageUrl: string;
  productCount: number;
  order?: number;
  subcategories?: {
    id?: string | number;
    slug: string;
    name: string;
    iconName?: string;
    order?: number;
  }[];
}

export interface CalculatorPayload {
  objectType: "office" | "warehouse" | "retail" | "industrial" | "residential";
  areaSqM: number;
  entryPointsCount: number;
  cameraResolution: "2mp" | "4mp" | "8mp_4k";
  storageDays: 7 | 14 | 30 | 60;
  needsAccessControl: boolean;
  needsFireAlarm: boolean;
  needsIntercom: boolean;
}

export interface CalculatorResult {
  recommendedPackage: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  currency: string;
  suggestedProducts: {
    sku: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface OrganizationInfo {
  name: string;
  legalName: string;
  url: string;
  logo: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  openingHours: string;
  sameAs: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
