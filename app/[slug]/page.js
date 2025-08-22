import { getCategoryBySlug } from "../navLinks";
import CategoryPageClient from "./CategoryPageClient"; // client tarafı

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoryInfo = getCategoryBySlug(slug);

  if (!categoryInfo) {
    return {
      title: "Kategori Bulunamadı - Özhan Asker Malzemeleri",
      description: "Aradığınız kategori mevcut değil.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryInfo.label} - Özhan Asker Malzemeleri`,
    description: `${categoryInfo.label} kategorisindeki en kaliteli ürünler. Uygun fiyatlarla hızlı kargo fırsatı!`,
    keywords: `${
      categoryInfo.label
    }, asker malzemeleri, ucuz ${categoryInfo.label.toLowerCase()}, askerlik alışverişi`,
    openGraph: {
      title: `${categoryInfo.label} - Özhan Asker Malzemeleri`,
      description: `${categoryInfo.label} kategorisindeki ürünleri inceleyin.`,
      url: `https://askeruzmani.com.tr/${slug}`,
      siteName: "Özhan Asker Malzemeleri",
      images: [
        {
          url: "https://askeruzmani.com.tr/default-category.jpg",
          width: 1200,
          height: 630,
          alt: `${categoryInfo.label} ürünleri`,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    alternates: {
      canonical: `https://askeruzmani.com.tr/${slug}`,
    },
  };
}

export default function CategoryPage({ params }) {
  return <CategoryPageClient slug={params.slug} />;
}
