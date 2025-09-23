import { getCategoryBySlug } from "../../navLinks";
import { getProducts } from "../../utils/axiosInstance";
import ProductDetailClient from "./ProductDetail";

export async function generateMetadata({ params }) {
  const p = await params;
  const { slug, productSlug } = p;

  const categoryInfo = getCategoryBySlug(slug);
  const products = await getProducts(); 
  const product = products.find((p) => p.slug === productSlug);

  if (!categoryInfo || !product) {
    return {
      title: "Ürün Bulunamadı -  Asker Uzmanı",
      description: "Aradığınız ürün mevcut değil.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} - Asker Uzmanı`,
    description: `${product.name} ürününü detaylıca inceleyin. ${categoryInfo.label} kategorisindeki en kaliteli askeri ürünlere güvenle ulaşın!`,
  };
}

export default async function ProductDetail({ params }) {
  const p = await params;
  const products = await getProducts();
  return <ProductDetailClient params={p} products={products} />;
}