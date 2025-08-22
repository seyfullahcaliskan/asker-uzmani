import { getCategoryBySlug } from "../navLinks";
import CategoryPageClient from "./CategoryPageClient"; // client tarafı

export async function generateMetadata({ params }) {
  const p = await params;
  const { slug } = p;

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
    description: `${categoryInfo.label} kategorisindeki en kaliteli ürünler.`,
  };
}

export default async function CategoryPage({ params }) {
  const p = await params;
  return <CategoryPageClient slug={p.slug} />;
}
