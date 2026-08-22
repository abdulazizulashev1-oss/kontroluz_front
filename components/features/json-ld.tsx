import React from "react";
import { Product, OrganizationInfo, BreadcrumbItem } from "@/shared/types";

export function OrganizationJsonLd({ org }: { org: OrganizationInfo }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    legalName: org.legalName,
    url: org.url,
    logo: org.logo,
    telephone: org.telephone,
    email: org.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: org.address.streetAddress,
      addressLocality: org.address.addressLocality,
      addressCountry: org.address.addressCountry,
    },
    sameAs: org.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd({ org }: { org: OrganizationInfo }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: org.name,
    image: org.logo,
    telephone: org.telephone,
    email: org.email,
    url: org.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: org.address.streetAddress,
      addressLocality: org.address.addressLocality,
      addressCountry: org.address.addressCountry,
    },
    openingHours: org.openingHours,
    priceRange: "$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kontrol.uz";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kontrol.uz",
    alternateName: ["Kontrol Security", "Kontrol.uz Industrial"],
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/katalog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kontrol.uz";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.image, ...(product.additionalImages || [])],
    description: product.shortDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Kontrol.uz",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/katalog/${product.categorySlug}/${product.slug}`,
      priceCurrency: product.currency || "UZS",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
