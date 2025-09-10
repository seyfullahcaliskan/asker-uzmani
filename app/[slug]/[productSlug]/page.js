import { getCategoryBySlug } from "../../navLinks";
import { getProducts } from "../../utils/axiosInstance";
import ProductDetailClient from "./ProductDetail";

export async function generateMetadata({ params }) {
  const p = await params;
  const { slug, productSlug } = p;

  const categoryInfo = getCategoryBySlug(slug);
  const products = await getProducts(); // server tarafında ürünleri çağır
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

export default async function ProductDetail({ params }) {
  const p = await params;
  const products = await getProducts(); // ürünler server tarafında çekiliyor
  return <ProductDetailClient params={p} products={products} />;
}