import products from "../../components/layout/data/products";
import { getCategoryBySlug } from "../../navLinks";
import ProductDetailClient from "./ProductDetail";

export async function generateMetadata({ params }) {
  const { slug, productSlug } = await params;

  const categoryInfo = getCategoryBySlug(slug);
  const product = products.find((p) => p.slug === productSlug);

  if (!categoryInfo || !product) {
    return {
      title: "Ürün Bulunamadı - Özhan Asker Malzemeleri",
      description: "Aradığınız ürün mevcut değil.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} - Özhan Asker Malzemeleri`,
    description: `${product.name} hakkında detaylı bilgi alın. ${categoryInfo.label} kategorisindeki en kaliteli ürünler.`,
  };
}

export default function ProductDetail({ params }) {
  return <ProductDetailClient params={params} />;
}
