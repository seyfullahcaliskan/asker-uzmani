import { getCategoryBySlug } from "../navLinks";
import { getProducts } from "../utils/axiosInstance";
import CategoryPageClient from "./CategoryPageClient";

export async function generateMetadata({ params }) {
  const p = await params;
  const { slug } = p;

  const categoryInfo = getCategoryBySlug(slug);

  if (!categoryInfo) {
    return {
      title: "Kategori Bulunamadı - Asker Uzmanı",
      description: "Aradığınız kategori mevcut değil.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${categoryInfo.label} - Asker Uzmanı`,
    description: `${categoryInfo.label} kategorisinde en kaliteli ürünleri keşfedin. İhtiyacınız olan askeri malzemeleri güvenle online sipariş verin!`,
  };
}

export default async function CategoryPage({ params }) {
  const p = await params;
  const products = await getProducts();

  return <CategoryPageClient slug={p.slug} products={products} />;
}